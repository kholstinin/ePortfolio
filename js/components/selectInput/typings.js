import {TSelectOption} from '../../typings/Common';

export type TSelectInputProps = {
  width?: number,
  onItemPress: (newValue: string) => void,
  value: string,
  options: Array<TSelectOption>,
};