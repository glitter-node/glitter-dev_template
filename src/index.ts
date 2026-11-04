/**
 * Glitter Dev Template User Template
 *
 * 그누보드7 템플릿 엔진용 사용자 템플릿 컴포넌트 패키지
 * Nexibase 스타일 기반
 */

// Logger 설정 (G7Core 초기화 전에도 동작하도록 폴백 포함)
const logger = ((window as any).G7Core?.createLogger?.('Template:glitter-dev_template')) ?? {
    log: (...args: unknown[]) => console.log('[Template:glitter-dev_template]', ...args),
    warn: (...args: unknown[]) => console.warn('[Template:glitter-dev_template]', ...args),
    error: (...args: unknown[]) => console.error('[Template:glitter-dev_template]', ...args),
};

// Styles
import './styles/main.css';
import './styles/studio.css';

// Basic Components (Header, Footer는 composite에서 사용하므로 여기서는 별도 이름으로 export)
export {
  Button,
  type ButtonProps,
  FileInput,
  type FileInputProps,
  Input,
  type InputProps,
  PasswordInput,
  type PasswordInputProps,
  type PasswordRule,
  defaultPasswordRules,
  availablePasswordRules,
  Textarea,
  type TextareaProps,
  Label,
  type LabelProps,
  Div,
  type DivProps,
  Span,
  type SpanProps,
  P,
  type PProps,
  Img,
  type ImgProps,
  H1,
  type H1Props,
  H2,
  type H2Props,
  H3,
  type H3Props,
  H4,
  type H4Props,
  Ul,
  type UlProps,
  Ol,
  type OlProps,
  Li,
  type LiProps,
  A,
  type AProps,
  Form,
  type FormProps,
  Select,
  type SelectProps,
  Option,
  type OptionProps,
  Optgroup,
  type OptgroupProps,
  Checkbox,
  type CheckboxProps,
  Table,
  type TableProps,
  Thead,
  type TheadProps,
  Tbody,
  type TbodyProps,
  Tr,
  type TrProps,
  Th,
  type ThProps,
  Td,
  type TdProps,
  Nav,
  type NavProps,
  Section,
  type SectionProps,
  Svg,
  type SvgProps,
  Icon,
  type IconProps,
  Code,
  type CodeProps,
  Hr,
  type HrProps,
  IconName,
  type IconStyle,
  type IconSize,
} from './components/basic';

// Composite Components
export * from './components/composite';

// Layout Components
export * from './components/layout';

// Template Metadata
import templateMetadata from '../template.json';

// Handlers
import { handlerMap } from './handlers';

// IDV Modal Launcher (engine-v1.46.0+)
import { registerGlitterDevTemplateIdentityLauncher } from './handlers/identityLauncher';

// 서버 기기 감지값(appConfig.isIos) 클라이언트 보정 (iPadOS 데스크탑 UA 케이스)
import { correctIosDeviceState } from './handlers/deviceCorrection';

// 인증 경계 비회원 저장값 정리 (#639 ⑦)
import { installAuthBoundaryStorageCleanup } from './handlers/authBoundaryStorage';

// handlerMap을 전역으로 노출 (로케일 변경 시 재등록용)
if (typeof window !== 'undefined') {
  (window as any).G7TemplateHandlers = handlerMap;
}

/**
 * 템플릿 메타데이터 export
 *
 * template.json 파일의 내용을 번들에 포함시켜 API 호출 없이
 * 코어 엔진에서 직접 접근 가능하도록 합니다.
 */
export { templateMetadata };

function initializeNonCriticalFeatures(): void {
  registerGlitterDevTemplateIdentityLauncher();
  installAuthBoundaryStorageCleanup();
}

let postRenderLifecycleRegistered = false;
let editorWidgetsLoadPromise: Promise<void> | null = null;

function loadEditorWidgets(): void {
  if (typeof window === 'undefined' || !/^\/admin\/layout-editor(?:\/|$)/.test(window.location.pathname)) {
    return;
  }

  const asset = (window as any).G7Core?.asset;
  if (typeof asset?.template !== 'function' || typeof asset?.loadScript !== 'function') {
    logger.warn('Template asset loader is unavailable for layout editor widgets');
    return;
  }

  const url = asset.template('glitter-dev_template', 'js/editor.iife.js');
  if (!editorWidgetsLoadPromise) {
    const loadPromise: Promise<void> = asset.loadScript(
      url,
      { id: 'glitter-dev-template-editor-widgets' },
      { label: 'glitter-dev_template editor widgets' },
    );
    editorWidgetsLoadPromise = loadPromise;
    loadPromise.catch((error: unknown) => {
      logger.error('Failed to load layout editor widgets', error);
    });
  }
}

function ensurePostRenderLifecycle(): boolean {
  if (postRenderLifecycleRegistered || typeof window === 'undefined') {
    return postRenderLifecycleRegistered;
  }

  const registerLifecycle = (window as any).G7Core?.registerTemplateLifecycle;
  if (typeof registerLifecycle !== 'function') {
    return false;
  }

  registerLifecycle(initializeNonCriticalFeatures);
  postRenderLifecycleRegistered = true;
  return true;
}

ensurePostRenderLifecycle();

/**
 * 템플릿 초기화 함수
 *
 * 코어 엔진에 커스텀 핸들러를 등록합니다.
 */
export function initTemplate(): void {
  if (typeof window !== 'undefined') {
    if (typeof (window as any).G7Core?.registerTemplateLifecycle === 'function') {
      const correctDeviceState = () => correctIosDeviceState();
      if (document.readyState === 'complete') {
        correctDeviceState();
      } else {
        window.addEventListener('load', correctDeviceState, { once: true });
      }
      return;
    }

    let retryCount = 0;
    const maxRetries = 50; // 최대 5초 대기 (50 * 100ms)

    const registerHandlers = () => {
      const actionDispatcher = (window as any).G7Core?.getActionDispatcher?.();

      if (actionDispatcher) {
        // handlerMap의 모든 핸들러를 자동으로 등록
        Object.entries(handlerMap).forEach(([name, handler]) => {
          actionDispatcher.registerHandler(name, handler);
        });

        correctIosDeviceState();

        logger.log(`${Object.keys(handlerMap).length} custom handler(s) registered:`, Object.keys(handlerMap));

        if (!ensurePostRenderLifecycle()) {
          initializeNonCriticalFeatures();
        }
      } else {
        retryCount++;
        if (retryCount <= maxRetries) {
          logger.warn(`ActionDispatcher not found, retrying... (${retryCount}/${maxRetries})`);
          setTimeout(registerHandlers, 100);
        } else {
          logger.error('Failed to register handlers: ActionDispatcher not available after maximum retries');
        }
      }
    };

    // window.load 이벤트 사용 (모든 리소스 로드 완료 후)
    if (document.readyState === 'complete') {
      registerHandlers();
    } else {
      window.addEventListener('load', registerHandlers);
    }
  }
}

loadEditorWidgets();

// 템플릿 초기화 자동 실행
initTemplate();
