import React from 'react';
import { Div } from '../basic/Div';
import type { EditorAttrs } from '../../types';

export interface ThreeColumnLayoutProps {
  /**
   * DOM id 속성 (레이아웃 편집기 코어 일괄 ID)
   */
  id?: string;

  /**
   * 왼쪽 영역 너비
   */
  leftWidth?: string;

  /**
   * 오른쪽 영역 너비
   */
  rightWidth?: string;

  /**
   * 왼쪽 슬롯 컨텐츠
   */
  leftSlot?: React.ReactNode;

  /**
   * 가운데 슬롯 컨텐츠
   */
  centerSlot?: React.ReactNode;

  /**
   * 오른쪽 슬롯 컨텐츠
   */
  rightSlot?: React.ReactNode;

  /**
   * 사용자 정의 클래스
   */
  className?: string;

  /**
   * 레이아웃 편집기 주입 속성 (편집 모드 전용, 루트에 spread)
   */
  editorAttrs?: EditorAttrs;
}

/**
 * ThreeColumnLayout 레이아웃 컴포넌트
 *
 * 3단 레이아웃 구조를 제공하는 기본 layout 컴포넌트입니다.
 * leftWidth, rightWidth를 조절할 수 있으며 각 영역에 슬롯을 제공합니다.
 *
 * @example
 * <ThreeColumnLayout
 *   leftWidth="250px"
 *   rightWidth="300px"
 *   leftSlot={<div>Left Content</div>}
 *   centerSlot={<div>Center Content</div>}
 *   rightSlot={<div>Right Content</div>}
 * />
 */
export const ThreeColumnLayout: React.FC<ThreeColumnLayoutProps> = ({
  id,
  leftWidth = '250px',
  rightWidth = '300px',
  leftSlot,
  centerSlot,
  rightSlot,
  className = '',
  editorAttrs,
}) => {
  const containerClasses = `flex flex-row w-full h-full ${className}`.trim();
  const leftValue = Number.parseInt(leftWidth, 10);
  const rightValue = Number.parseInt(rightWidth, 10);
  const supportedWidths = [200, 250, 300, 320, 360, 400];
  const leftClass = supportedWidths.includes(leftValue) ? `g7-three-left-${leftValue}` : 'g7-three-left-250';
  const rightClass = supportedWidths.includes(rightValue) ? `g7-three-right-${rightValue}` : 'g7-three-right-300';

  return (
    <Div id={id} className={containerClasses} {...editorAttrs}>
      {/* 왼쪽 영역 */}
      <Div className={`flex flex-col ${leftClass}`}>
        {leftSlot}
      </Div>

      {/* 가운데 영역 */}
      <Div className="flex flex-col flex-1 min-w-0">
        {centerSlot}
      </Div>

      {/* 오른쪽 영역 */}
      <Div className={`flex flex-col ${rightClass}`}>
        {rightSlot}
      </Div>
    </Div>
  );
};
