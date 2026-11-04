const LOCK_COUNT_ATTRIBUTE = 'data-g7-scroll-lock-count';
const LOCK_CLASS = 'g7-scroll-locked';

export const acquireScrollLock = (): void => {
  const body = document.body;
  const count = Number.parseInt(body.getAttribute(LOCK_COUNT_ATTRIBUTE) ?? '0', 10) || 0;
  body.setAttribute(LOCK_COUNT_ATTRIBUTE, String(count + 1));
  body.classList.add(LOCK_CLASS);
};

export const releaseScrollLock = (): void => {
  const body = document.body;
  const count = Number.parseInt(body.getAttribute(LOCK_COUNT_ATTRIBUTE) ?? '0', 10) || 0;
  if (count <= 1) {
    body.removeAttribute(LOCK_COUNT_ATTRIBUTE);
    body.classList.remove(LOCK_CLASS);
    return;
  }
  body.setAttribute(LOCK_COUNT_ATTRIBUTE, String(count - 1));
};
