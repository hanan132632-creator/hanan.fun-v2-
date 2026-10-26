import React from 'react';
import { AdsterraPlacement, AdsterraPlacementProps } from './AdsterraPlacement';

// Backward compatibility alias: re-routes all former AdSense placements to the clean Adsterra engine.
// All Google AdSense scripts, tags, and dependencies have been permanently removed.
export const AdSensePlacement: React.FC<AdsterraPlacementProps> = (props) => {
  return <AdsterraPlacement {...props} />;
};

export { AdsterraPlacement };
