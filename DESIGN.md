---
name: Artisanal Cocoa Noir
colors:
  surface: '#fff8ef'
  surface-dim: '#e1d9cb'
  surface-bright: '#fff8ef'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#fbf3e4'
  surface-container: '#f5edde'
  surface-container-high: '#efe7d9'
  surface-container-highest: '#e9e2d3'
  on-surface: '#1e1b13'
  on-surface-variant: '#514441'
  inverse-surface: '#343026'
  inverse-on-surface: '#f8f0e1'
  outline: '#837470'
  outline-variant: '#d5c3be'
  surface-tint: '#7c5549'
  primary: '#240b05'
  on-primary: '#ffffff'
  primary-container: '#3d1f16'
  on-primary-container: '#b18477'
  inverse-primary: '#eebbad'
  secondary: '#735c00'
  on-secondary: '#ffffff'
  secondary-container: '#fed65b'
  on-secondary-container: '#745c00'
  tertiary: '#210d07'
  on-tertiary: '#ffffff'
  tertiary-container: '#39211a'
  on-tertiary-container: '#aa867d'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdbd1'
  primary-fixed-dim: '#eebbad'
  on-primary-fixed: '#2f140b'
  on-primary-fixed-variant: '#623e33'
  secondary-fixed: '#ffe088'
  secondary-fixed-dim: '#e9c349'
  on-secondary-fixed: '#241a00'
  on-secondary-fixed-variant: '#574500'
  tertiary-fixed: '#ffdbd1'
  tertiary-fixed-dim: '#e6bdb3'
  on-tertiary-fixed: '#2c1610'
  on-tertiary-fixed-variant: '#5d4038'
  background: '#fff8ef'
  on-background: '#1e1b13'
  surface-variant: '#e9e2d3'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 64px
    fontWeight: '700'
    lineHeight: 72px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '600'
    lineHeight: 56px
  headline-md:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  body-lg:
    fontFamily: Montserrat
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Montserrat
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-lg:
    fontFamily: Montserrat
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.1em
  label-sm:
    fontFamily: Montserrat
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1200px
  gutter: 24px
  margin-mobile: 20px
  margin-desktop: 64px
  section-gap: 120px
---

## Brand & Style

The design system is engineered to evoke the sensory experience of premium, hand-crafted chocolate. The brand personality is sophisticated, indulgent, and heritage-driven, targeting a discerning audience that values craftsmanship over mass production.

The visual style blends **Modern Minimalism** with **Tactile Luxury**. It utilizes generous whitespace to signify exclusivity, high-quality editorial typography to establish authority, and subtle organic textures (such as fine-grain paper or matte finishes) to reinforce the "artisanal" touch. Interactions should be slow and intentional, employing smooth easing functions that mimic the melting of chocolate.

## Colors

The palette is rooted in the deep, earthy tones of the cacao bean. 
- **Primary (Deep Cocoa):** Used for primary text and structural elements.
- **Secondary (Elegant Gold):** Reserved for calls to action, high-level accents, and premium signifiers.
- **Tertiary (Dark Chocolate):** Used for deep backgrounds and high-contrast containers.
- **Neutral (Smooth Cream):** The primary canvas color, providing a warmer, more organic feel than pure white.

Use the gold accent sparingly to maintain its impact. Gradients should be avoided in favor of solid, rich blocks of color or subtle noise textures.

## Typography

Typography in this design system follows a classic editorial hierarchy. **Playfair Display** provides a sense of history and luxury; use it for all storytelling headings and product titles. **Montserrat** provides a clean, functional counterpoint for body descriptions and navigational elements.

Key rules:
- Use `label-lg` for all category headers and small caps titles to create a "branded label" effect.
- Maintain generous line heights to ensure readability and a sense of "air" within the layout.
- For mobile, reduce display sizes significantly to prevent awkward word breaks in the high-contrast serif.

## Layout & Spacing

This design system utilizes a **fixed grid** approach on desktop to maintain the "boutique" feel of a high-end catalog. 

- **Desktop:** 12-column grid with a 1200px max-width, centered.
- **Tablet:** 8-column fluid grid with 40px margins.
- **Mobile:** 4-column fluid grid with 20px margins.

Spacing is intentionally loose. Sections should be separated by large vertical gaps (`section-gap`) to allow the product photography to breathe. Use the 8px base unit for all internal component padding and smaller spatial relationships.

## Elevation & Depth

Depth is conveyed through **tonal layers** and **ambient shadows** rather than harsh lighting. 

- **Surfaces:** Use the Smooth Cream (#FDF5E6) as the base surface. Elevated cards should use a slightly lighter tint or a very subtle 1px border in a muted gold.
- **Shadows:** Shadows should be extremely soft, using the primary cocoa color at very low opacity (3-5%) with a large blur radius (20px-40px). This creates a "resting" effect rather than a "floating" effect.
- **Transitions:** State changes (like hover) should use long duration fades (300ms+) to maintain the premium, calm atmosphere.

## Shapes

The shape language is **Soft (0.25rem - 0.75rem)**. While the brand is premium, completely sharp corners can feel too aggressive or corporate. Softened corners suggest the organic, molded nature of chocolate bars and truffles.

- **Buttons & Inputs:** Use the base `rounded` (4px).
- **Product Cards:** Use `rounded-lg` (8px) to frame photography gently.
- **Interactive Elements:** Maintain consistent radii across all nested components to create a unified architectural feel.

## Components

### Buttons
Primary buttons feature a Deep Cocoa (#3D1F16) background with Gold (#D4AF37) text. Secondary buttons are outlined in Gold with no fill. On hover, the primary button should subtly scale (1.02x) and the gold border should brighten.

### Product Cards
Cards are the centerpiece of the experience. They should feature a "hover swap" pattern: 
1. **Default:** Minimalist view with product photography on a cream background.
2. **Hover:** Transition to a close-up texture shot or an "ingredients" view with a subtle gold border appearing.

### Input Fields
Inputs use a minimal bottom-border style or a very light cream fill. Labels use the `label-sm` style, positioned above the field. Focus states are indicated by a shift from a cocoa border to a gold border.

### Chips & Tags
Used for flavor profiles (e.g., "70% Dark", "Sea Salt"). These should be styled as "label-sm" with a very thin cocoa outline and significant horizontal padding, resembling high-end packaging labels.

### Subtle Textures
Incorporate a 5% opacity "grain" or "linen" texture overlay on primary backgrounds to give the digital interface a physical, paper-like quality.