/**
 * Haptic feedback utility — wraps navigator.vibrate with safe fallback.
 *
 * Usage:
 *   haptic.tap()    — light tap (10ms)         — button taps
 *   haptic.bump()   — medium bump (20ms)       — page transitions
 *   haptic.success() — celebration pattern    — form submitted / copied
 *   haptic.custom(ms | number[]) — custom    — anything specific
 *
 * Support matrix:
 *   - Android Chrome / Firefox / Samsung: ✓ since 2015
 *   - iOS Safari 16.4+ (March 2023): ✓ partial — vibrate works on user gesture
 *   - Desktop browsers: no-op (silent)
 */

function vibrate(pattern: number | number[]) {
  if (typeof navigator === "undefined") return;
  if (!("vibrate" in navigator)) return;
  try {
    navigator.vibrate(pattern);
  } catch {
    // some browsers throw if not in a user gesture — silent fail is fine
  }
}

export const haptic = {
  tap:     () => vibrate(10),
  bump:    () => vibrate(20),
  success: () => vibrate([15, 30, 15]),
  custom:  (pattern: number | number[]) => vibrate(pattern),
};
