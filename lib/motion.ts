/**
 * Shared motion values for JS-driven animations. These cannot live in
 * `globals.css` as theme keys because Motion consumes them as JS numbers.
 *
 * EASE_OUT is a cubic bezier that starts fast and settles slowly: things
 * arrive quickly, then decelerate into place. Typed as a readonly tuple,
 * which matches Motion's BezierDefinition.
 */
export const EASE_OUT = [0.16, 1, 0.3, 1] as const;

export const DURATION = {
  fast: 0.18, // small UI responses (header menu, hover transitions)
  reveal: 0.5, // scroll-into-view reveals
} as const;

/** The disclosure spring: stiff enough to snap open, damped enough to settle
    without a bounce. Panels (accordion, garden) use this instead of a tween
    so expansion feels physical. */
export const SPRING = { stiffness: 300, damping: 30 } as const;
