import React from "react";
import { Composition } from "remotion";
import { layout } from "./brand";

// Printer-Specific
import { AxisSteps } from "./compositions/printer-specific/AxisSteps";
import { ESteps } from "./compositions/printer-specific/ESteps";
import { PidTuning } from "./compositions/printer-specific/PidTuning";
import { BedMesh } from "./compositions/printer-specific/BedMesh";
import { ProbeZOffset } from "./compositions/printer-specific/ProbeZOffset";
import { BeltTension } from "./compositions/printer-specific/BeltTension";
import { InputShaper } from "./compositions/printer-specific/InputShaper";
import { Backlash } from "./compositions/printer-specific/Backlash";
import { SkewCompensation } from "./compositions/printer-specific/SkewCompensation";
import { MaxAccelVelocity } from "./compositions/printer-specific/MaxAccelVelocity";

// Filament-Specific
import { ExtrusionTemp } from "./compositions/filament-specific/ExtrusionTemp";
import { FlowRate } from "./compositions/filament-specific/FlowRate";
import { Retraction } from "./compositions/filament-specific/Retraction";
import { PressureAdvance } from "./compositions/filament-specific/PressureAdvance";
import { MaxVolumetricFlow } from "./compositions/filament-specific/MaxVolumetricFlow";
import { BedTemp } from "./compositions/filament-specific/BedTemp";
import { CoolingFan } from "./compositions/filament-specific/CoolingFan";
import { SpeedProfile } from "./compositions/filament-specific/SpeedProfile";

// Live Tuning
import { AdaptiveSpeed } from "./compositions/live-tuning/AdaptiveSpeed";
import { TempCompensation } from "./compositions/live-tuning/TempCompensation";
import { FlowCompensation } from "./compositions/live-tuning/FlowCompensation";
import { AnomalyDetection } from "./compositions/live-tuning/AnomalyDetection";

const shared = {
  width: layout.width,
  height: layout.height,
  fps: layout.fps,
  durationInFrames: layout.fps * 8, // 8 seconds per variable
};

export const RemotionRoot: React.FC = () => (
  <>
    {/* Printer-Specific Calibrations */}
    <Composition id="PS01-AxisSteps" component={AxisSteps} {...shared} />
    <Composition id="PS02-ESteps" component={ESteps} {...shared} />
    <Composition id="PS03-PidTuning" component={PidTuning} {...shared} />
    <Composition id="PS04-BedMesh" component={BedMesh} {...shared} />
    <Composition id="PS05-ProbeZOffset" component={ProbeZOffset} {...shared} />
    <Composition id="PS06-BeltTension" component={BeltTension} {...shared} />
    <Composition id="PS07-InputShaper" component={InputShaper} {...shared} />
    <Composition id="PS08-Backlash" component={Backlash} {...shared} />
    <Composition id="PS09-SkewCompensation" component={SkewCompensation} {...shared} />
    <Composition id="PS10-MaxAccelVelocity" component={MaxAccelVelocity} {...shared} />

    {/* Filament-Specific Calibrations */}
    <Composition id="FS01-ExtrusionTemp" component={ExtrusionTemp} {...shared} />
    <Composition id="FS02-FlowRate" component={FlowRate} {...shared} />
    <Composition id="FS03-Retraction" component={Retraction} {...shared} />
    <Composition id="FS04-PressureAdvance" component={PressureAdvance} {...shared} />
    <Composition id="FS05-MaxVolumetricFlow" component={MaxVolumetricFlow} {...shared} />
    <Composition id="FS06-BedTemp" component={BedTemp} {...shared} />
    <Composition id="FS07-CoolingFan" component={CoolingFan} {...shared} />
    <Composition id="FS08-SpeedProfile" component={SpeedProfile} {...shared} />

    {/* Live Tuning */}
    <Composition id="LT01-AdaptiveSpeed" component={AdaptiveSpeed} {...shared} />
    <Composition id="LT02-TempCompensation" component={TempCompensation} {...shared} />
    <Composition id="LT03-FlowCompensation" component={FlowCompensation} {...shared} />
    <Composition id="LT04-AnomalyDetection" component={AnomalyDetection} {...shared} />
  </>
);
