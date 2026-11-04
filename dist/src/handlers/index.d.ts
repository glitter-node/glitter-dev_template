import { addSelectedItemIfCompleteHandler, updateSelectedItemQuantityHandler, removeSelectedItemHandler, updateNoOptionQuantityHandler, setBlockAdditionalOptionHandler } from './productOptions';
import { toggleCartItemSelectionHandler, selectAllCartItemsHandler, setCartOptionHandler, openCartDeleteModalHandler, openCartOptionModalHandler, recalculateCartHandler } from './cartHandlers';
import { findMatchingOptionHandler, initCartOptionSelectionHandler } from './cartOptionChange';
import { initCartKeyHandler, getCartKeyHandler, clearCartKeyHandler, regenerateCartKeyHandler, saveToStorageHandler, loadFromStorageHandler, initGuestOrderTokenHandler, saveGuestOrderTokenHandler, clearGuestOrderTokenHandler, clearGuestTokenOnEntryHandler, initSecretViewTokenHandler, saveSecretViewTokenHandler, clearSecretViewTokenHandler } from './storageHandlers';
import { getDisplayPriceHandler } from './getDisplayPrice';
import { formatCurrencyHandler, getCurrencySymbol } from './formatCurrency';
import { loadPreferredCurrencyHandler, savePreferredCurrencyHandler } from './loadPreferredCurrency';
import { setThemeHandler, initThemeHandler } from './setThemeHandler';
import { redirectToLoginWithReturnHandler } from './redirectToLoginWithReturn';
import { downloadAttachmentHandler } from './downloadAttachment';
import { markLocalOnceHandler } from './markLocalOnce';
import { rememberIdentityClaimHandler } from './identityLauncher';
/**
 * glitter-dev_template 템플릿의 모든 커스텀 핸들러
 *
 * 네이밍 규칙: 'glitter-dev_template.[핸들러명]'
 *
 * @example
 * // 레이아웃 JSON에서 사용
 * {
 *   "handler": "custom",
 *   "name": "addSelectedItemIfComplete",
 *   "params": { ... }
 * }
 *
 * // 또는 풀네임으로
 * {
 *   "handler": "glitter-dev_template.addSelectedItemIfComplete",
 *   "params": { ... }
 * }
 */
export declare const handlers: {
    'glitter-dev_template.addSelectedItemIfComplete': typeof addSelectedItemIfCompleteHandler;
    'glitter-dev_template.updateSelectedItemQuantity': typeof updateSelectedItemQuantityHandler;
    'glitter-dev_template.removeSelectedItem': typeof removeSelectedItemHandler;
    'glitter-dev_template.updateNoOptionQuantity': typeof updateNoOptionQuantityHandler;
    'glitter-dev_template.setBlockAdditionalOption': typeof setBlockAdditionalOptionHandler;
    'glitter-dev_template.getDisplayPrice': typeof getDisplayPriceHandler;
    'glitter-dev_template.formatCurrency': typeof formatCurrencyHandler;
    'glitter-dev_template.getCurrencySymbol': typeof getCurrencySymbol;
    'glitter-dev_template.loadPreferredCurrency': typeof loadPreferredCurrencyHandler;
    'glitter-dev_template.savePreferredCurrency': typeof savePreferredCurrencyHandler;
    setTheme: typeof setThemeHandler;
    initTheme: typeof initThemeHandler;
    redirectToLoginWithReturn: typeof redirectToLoginWithReturnHandler;
    downloadAttachment: typeof downloadAttachmentHandler;
    'glitter-dev_template.markLocalOnce': typeof markLocalOnceHandler;
    'glitter-dev_template.rememberIdentityClaim': typeof rememberIdentityClaimHandler;
    toggleCartItemSelection: typeof toggleCartItemSelectionHandler;
    selectAllCartItems: typeof selectAllCartItemsHandler;
    setCartOption: typeof setCartOptionHandler;
    openCartDeleteModal: typeof openCartDeleteModalHandler;
    openCartOptionModal: typeof openCartOptionModalHandler;
    recalculateCart: typeof recalculateCartHandler;
    findMatchingOption: typeof findMatchingOptionHandler;
    initCartOptionSelection: typeof initCartOptionSelectionHandler;
    initCartKey: typeof initCartKeyHandler;
    getCartKey: typeof getCartKeyHandler;
    clearCartKey: typeof clearCartKeyHandler;
    regenerateCartKey: typeof regenerateCartKeyHandler;
    saveToStorage: typeof saveToStorageHandler;
    loadFromStorage: typeof loadFromStorageHandler;
    initGuestOrderToken: typeof initGuestOrderTokenHandler;
    saveGuestOrderToken: typeof saveGuestOrderTokenHandler;
    clearGuestOrderToken: typeof clearGuestOrderTokenHandler;
    clearGuestTokenOnEntry: typeof clearGuestTokenOnEntryHandler;
    initSecretViewToken: typeof initSecretViewTokenHandler;
    saveSecretViewToken: typeof saveSecretViewTokenHandler;
    clearSecretViewToken: typeof clearSecretViewTokenHandler;
};
/**
 * 핸들러 맵 (handlerMap alias)
 *
 * index.ts에서 import할 때 사용
 */
export declare const handlerMap: {
    'glitter-dev_template.addSelectedItemIfComplete': typeof addSelectedItemIfCompleteHandler;
    'glitter-dev_template.updateSelectedItemQuantity': typeof updateSelectedItemQuantityHandler;
    'glitter-dev_template.removeSelectedItem': typeof removeSelectedItemHandler;
    'glitter-dev_template.updateNoOptionQuantity': typeof updateNoOptionQuantityHandler;
    'glitter-dev_template.setBlockAdditionalOption': typeof setBlockAdditionalOptionHandler;
    'glitter-dev_template.getDisplayPrice': typeof getDisplayPriceHandler;
    'glitter-dev_template.formatCurrency': typeof formatCurrencyHandler;
    'glitter-dev_template.getCurrencySymbol': typeof getCurrencySymbol;
    'glitter-dev_template.loadPreferredCurrency': typeof loadPreferredCurrencyHandler;
    'glitter-dev_template.savePreferredCurrency': typeof savePreferredCurrencyHandler;
    setTheme: typeof setThemeHandler;
    initTheme: typeof initThemeHandler;
    redirectToLoginWithReturn: typeof redirectToLoginWithReturnHandler;
    downloadAttachment: typeof downloadAttachmentHandler;
    'glitter-dev_template.markLocalOnce': typeof markLocalOnceHandler;
    'glitter-dev_template.rememberIdentityClaim': typeof rememberIdentityClaimHandler;
    toggleCartItemSelection: typeof toggleCartItemSelectionHandler;
    selectAllCartItems: typeof selectAllCartItemsHandler;
    setCartOption: typeof setCartOptionHandler;
    openCartDeleteModal: typeof openCartDeleteModalHandler;
    openCartOptionModal: typeof openCartOptionModalHandler;
    recalculateCart: typeof recalculateCartHandler;
    findMatchingOption: typeof findMatchingOptionHandler;
    initCartOptionSelection: typeof initCartOptionSelectionHandler;
    initCartKey: typeof initCartKeyHandler;
    getCartKey: typeof getCartKeyHandler;
    clearCartKey: typeof clearCartKeyHandler;
    regenerateCartKey: typeof regenerateCartKeyHandler;
    saveToStorage: typeof saveToStorageHandler;
    loadFromStorage: typeof loadFromStorageHandler;
    initGuestOrderToken: typeof initGuestOrderTokenHandler;
    saveGuestOrderToken: typeof saveGuestOrderTokenHandler;
    clearGuestOrderToken: typeof clearGuestOrderTokenHandler;
    clearGuestTokenOnEntry: typeof clearGuestTokenOnEntryHandler;
    initSecretViewToken: typeof initSecretViewTokenHandler;
    saveSecretViewToken: typeof saveSecretViewTokenHandler;
    clearSecretViewToken: typeof clearSecretViewTokenHandler;
};
/**
 * 핸들러 타입 정의 (TypeScript 자동완성용)
 */
export type GlitterDevTemplateHandlers = typeof handlers;
export { addSelectedItemIfCompleteHandler, updateSelectedItemQuantityHandler, removeSelectedItemHandler, updateNoOptionQuantityHandler, setBlockAdditionalOptionHandler, getDisplayPriceHandler, formatCurrencyHandler, getCurrencySymbol, loadPreferredCurrencyHandler, savePreferredCurrencyHandler, setThemeHandler, initThemeHandler, redirectToLoginWithReturnHandler, downloadAttachmentHandler, markLocalOnceHandler, toggleCartItemSelectionHandler, selectAllCartItemsHandler, setCartOptionHandler, openCartDeleteModalHandler, openCartOptionModalHandler, recalculateCartHandler, findMatchingOptionHandler, initCartOptionSelectionHandler, initCartKeyHandler, getCartKeyHandler, clearCartKeyHandler, regenerateCartKeyHandler, saveToStorageHandler, loadFromStorageHandler, initGuestOrderTokenHandler, saveGuestOrderTokenHandler, clearGuestOrderTokenHandler, clearGuestTokenOnEntryHandler, initSecretViewTokenHandler, saveSecretViewTokenHandler, clearSecretViewTokenHandler, };
