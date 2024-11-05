import { PolymerElement } from '@polymer/polymer';
import { TempAny } from '../temp-any';

export const generateClassName = (value: string | undefined): string => {
  return value
    ? value
        .replace(/\W+/g, '-')
        .replace(/([a-z\d])([A-Z])/g, '$1-$2')
        .toLowerCase()
    : '';
};

export const getVariableColor = (
  element: PolymerElement,
  value: string,
  fallback?: string
): string => {
  const ShadyCSS = (window as TempAny).ShadyCSS;
  const calculated = ShadyCSS
    ? ShadyCSS.getComputedStyleValue(element, `--${generateClassName(value)}`)
    : getComputedStyle(element, `--${generateClassName(value)}`);
  return calculated || (fallback && getVariableColor(element, fallback));
};

export const getBadgeColor = (badgeText: string): any => {
  const colors = ["#DA0862","#E3005D","#E90047","#EC0A28","#EB1700","#EA2500","#E63100","#DF3D00","#D35100","#CB5E00","#BF6D00","#B07000","#A17A00","#8F8000","#777700","#659400","#4E9B00","#1E9F00","#00A000","#00A21A","#00A43B","#00A653","#00A869","#00A87F","#00A693","#00A2A7","#00A0B3","#009FBD","#009AC9","#0094D4","#008CF0","#0084FF","#007CFF","#0072FF","#2D6BFF","#4E63FF","#625BFF","#724FFF","#7F49F8","#8E43E3","#9D3DD8","#AA36CA","#B52FB8","#C126A7","#CA1D94","#D31580"];
  const stringNum = [...badgeText].reduce((acc, char) => (acc + char.charCodeAt(0)) % 46, 0);
  return colors[stringNum]
}
