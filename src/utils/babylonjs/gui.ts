import { Control } from '@babylonjs/gui/2D/controls/control';

const getFontString = (control: Control): string => `${control.fontWeight} ${control.fontSize} ${control.fontFamily}`;

export { getFontString };
