import React from 'react';
import { AdSensePlacement, AdSensePlacementProps, ADSENSE_CLIENT_ID } from './AdSensePlacement';

export type AdsterraFormat =
  | '728x90'
  | '300x250'
  | '468x60'
  | '320x50'
  | '160x600'
  | 'leaderboard'
  | 'rectangle'
  | 'in-article'
  | 'auto'
  | 'fluid'
  | 'native';

export interface AdsterraPlacementProps extends Omit<AdSensePlacementProps, 'format'> {
  format?: AdsterraFormat;
  showConfigTrigger?: boolean;
}

// Routes all ad placements directly to official Google AdSense units
export const AdsterraPlacement: React.FC<AdsterraPlacementProps> = (props) => {
  return <AdSensePlacement {...props} client={props.client || ADSENSE_CLIENT_ID} />;
};

export { AdSensePlacement, ADSENSE_CLIENT_ID };
