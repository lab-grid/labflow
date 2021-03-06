import { Attachment } from "./attachment";
import { CalculatorBlockDefinition, EndTimestampBlockDefinition, OptionsQuestionBlockDefinition, PlateAddReagentBlockDefinition, PlateSamplerBlockDefinition, EndPlateSequencerBlockDefinition, StartTimestampBlockDefinition, TextQuestionBlockDefinition, StartPlateSequencerBlockDefinition, AddReagentBlockDefinition } from "./block-definition";
import { PlateCoordinate } from "./plate-coordinate";
import { PlateResult } from "./plate-result";

export type Block = TextQuestionBlock
    | OptionsQuestionBlock
    | CalculatorBlock
    | PlateSamplerBlock
    | PlateAddReagentBlock
    | AddReagentBlock
    | StartPlateSequencerBlock
    | EndPlateSequencerBlock
    | StartTimestampBlock
    | EndTimestampBlock;

export type VariableValue = {
    id?: string;
    value?: number;
}

export type PlateMapping = {
    label?: string;
    coordinates?: PlateCoordinate[];
    primer?: string;
};

export interface TextQuestionBlock {
    type: 'text-question';
    definition: TextQuestionBlockDefinition;

    answer?: string;
}

export interface OptionsQuestionBlock {
    type: 'options-question';
    definition: OptionsQuestionBlockDefinition;

    answer?: string;
}

export interface CalculatorBlock {
    type: 'calculator';
    definition: CalculatorBlockDefinition;

    values?: VariableValue[];
}

export interface PlateSamplerBlock {
    type: 'plate-sampler';
    definition: PlateSamplerBlockDefinition;

    plates?: PlateMapping[]

    outputPlateLabel?: string;
}

export interface PlateAddReagentBlock {
    type: 'plate-add-reagent';
    definition: PlateAddReagentBlockDefinition;

    plateLabel?: string;
    plateLot?: string;

    values?: VariableValue[];
}

export interface AddReagentBlock {
    type: 'add-reagent';
    definition: AddReagentBlockDefinition;

    reagentLot?: string;

    values?: VariableValue[];
}

export interface StartTimestampBlock {
    type: 'start-timestamp';
    definition: StartTimestampBlockDefinition;

    timestampLabel?: string;
    startedOn?: string;
}

export interface EndTimestampBlock {
    type: 'end-timestamp';
    definition: EndTimestampBlockDefinition;

    timestampLabel?: string;
    endedOn?: string;
}

export interface StartPlateSequencerBlock {
    type: 'start-plate-sequencer';
    definition: StartPlateSequencerBlockDefinition;

    plateLabels?: string[];
    timestampLabel?: string;
    startedOn?: string;
}

export interface EndPlateSequencerBlock {
    type: 'end-plate-sequencer';
    definition: EndPlateSequencerBlockDefinition;

    attachments?: Attachment[];
    plateSequencingResults?: PlateResult[];
    timestampLabel?: string;
    endedOn?: string;
}
