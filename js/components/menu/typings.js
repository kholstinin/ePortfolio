import type {TRoute} from '../../typings/Common';

export type MenuProps = {
  route: TRoute,
  setRoute: (newRoute: TRoute) => void,
  updatePortfolio: () => void,
};
