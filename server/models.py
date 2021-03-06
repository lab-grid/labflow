# TODO: Consider using this to build ts models: https://pypi.org/project/pydantic-to-typescript/

from pydantic import BaseModel
from typing import List, Union, Optional, Literal
from datetime import datetime


# System ----------------------------------------------------------------------

class HealthCheck(BaseModel):
    version: str
    server: bool = False
    database: bool = False
    database_error: Optional[str]

class SuccessResponse(BaseModel):
    success: bool

success = SuccessResponse(success=True)
failure = SuccessResponse(success=False)


# Resources -------------------------------------------------------------------

class AuditedModel(BaseModel):
    created_on: Optional[datetime]
    created_by: Optional[str]
    updated_on: Optional[datetime]
    updated_by: Optional[str]

class PaginatedModel(BaseModel):
    page: Optional[int]
    pageCount: Optional[int]

class UserModel(AuditedModel):
    id: str
    user_id: Optional[str]
    version_id: Optional[int]
    email: Optional[str]
    fullName: Optional[str]
    avatar: Optional[str]
    roles: Optional[List[str]]

class UsersModel(PaginatedModel):
    users: List[UserModel]

class Group(BaseModel):
    id: str

class Policy(BaseModel):
    user: str
    path: str
    method: str


# SampleResult ----------------------------------------------------------------

class SampleResult(AuditedModel):
    id: Optional[str]
    sampleID: str
    runID: int
    protocolID: int
    plateID: str

    result: Optional[str]
    marker1: Optional[str]
    marker2: Optional[str]
    plateRow: Optional[int]
    plateCol: Optional[int]

    signers: Optional[List[Optional[str]]]
    witnesses: Optional[List[Optional[str]]]

    plateLots: Optional[List[Optional[str]]]

    completedOn: Optional[str]

class SampleResults(PaginatedModel):
    samples: List[SampleResult]


# Attachment ------------------------------------------------------------------

class AttachmentModel(BaseModel):
    id: Optional[int]
    name: Optional[str]


# Protocol --------------------------------------------------------------------

class PlateCoordinate(BaseModel):
    row: Optional[int]
    col: Optional[int]
    plateIndex: Optional[int]
    sampleLabel: Optional[str]

class PlateResult(BaseModel):
    plateLabel: Optional[str]
    plateIndex: Optional[str]
    plateRow: Optional[int]
    plateCol: Optional[int]
    marker1: Optional[str]
    marker2: Optional[str]
    classification: Optional[str]

class BlockOption(BaseModel):
    id: str
    option: str

class BlockPrimer(BaseModel):
    id: str
    primer: str

class BlockParam(BaseModel):
    id: str
    param: str

class BlockVariable(BaseModel):
    id: str
    name: str
    defaultValue: Optional[float]

class BlockPlateMarkerEntry(BaseModel):
    marker1: Optional[str]
    marker2: Optional[str]
    plateIndex: Optional[int]
    plateRow: Optional[int]
    plateColumn: Optional[int]

class BlockPlate(BaseModel):
    id: str
    name: Optional[str]
    size: Optional[int]

class TextQuestionBlockDefinition(BaseModel):
    type: Literal['text-question'] = 'text-question'

    id: str
    name: Optional[str]

class OptionsQuestionBlockDefinition(BaseModel):
    type: Literal['options-question'] = 'options-question'

    id: str
    optionType: Optional[Literal['switch', 'checkbox', 'radio', 'menu-item', 'user']]
    optionType: Optional[str]
    options: Optional[List[BlockOption]]

class CalculatorBlockDefinition(BaseModel):
    type: Literal['calculator'] = 'calculator'

    id: str
    name: Optional[str]

    formula: Optional[str]
    variables: Optional[List[BlockVariable]]

class PlateSamplerBlockDefinition(BaseModel):
    type: Literal['plate-sampler'] = 'plate-sampler'

    id: str
    name: Optional[str]
    plates: Optional[List[Optional[BlockPlate]]]
    plateCount: Optional[int]
    platePrimers: Optional[List[BlockPrimer]]

class PlateAddReagentBlockDefinition(BaseModel):
    type: Literal['plate-add-reagent'] = 'plate-add-reagent'

    id: str
    name: Optional[str]
    plateName: Optional[str]
    plateSize: Optional[int]
    reagentLabel: Optional[str]

    formula: Optional[str]
    variables: Optional[List[BlockVariable]]

class AddReagentBlockDefinition(BaseModel):
    type: Literal['add-reagent'] = 'add-reagent'

    id: str
    name: Optional[str]
    reagentLabel: Optional[str]

    formula: Optional[str]
    variables: Optional[List[BlockVariable]]

class StartTimestampBlockDefinition(BaseModel):
    type: Literal['start-timestamp'] = 'start-timestamp'

    id: str
    name: Optional[str]

class EndTimestampBlockDefinition(BaseModel):
    type: Literal['end-timestamp'] = 'end-timestamp'

    id: str
    name: Optional[str]

class StartPlateSequencerBlockDefinition(BaseModel):
    type: Literal['start-plate-sequencer'] = 'start-plate-sequencer'

    id: str
    name: Optional[str]
    plates: Optional[List[Optional[BlockPlate]]]
    plateCount: Optional[int]

class EndPlateSequencerBlockDefinition(BaseModel):
    type: Literal['end-plate-sequencer'] = 'end-plate-sequencer'

    id: str
    name: Optional[str]
    plateMarkers: Optional[List[BlockPlateMarkerEntry]]

    importerType: Optional[Literal['synchronous', 'asynchronous']]
    importerUrl: Optional[str]
    importerCheckUrl: Optional[str]
    importerMethod: Optional[str]
    importerParams: Optional[List[BlockParam]]

# BLOCK_DEFINITIONS = {
#     "text-question": TextQuestionBlockDefinition,
#     "options-question": OptionsQuestionBlockDefinition,
#     "calculator": CalculatorBlockDefinition,
#     "plate-sampler": PlateSamplerBlockDefinition,
#     "plate-add-reagent": PlateAddReagentBlockDefinition,
#     "add-reagent": AddReagentBlockDefinition,
#     "start-timestamp": StartTimestampBlockDefinition,
#     "end-timestamp": EndTimestampBlockDefinition,
#     "start-plate-sequencer": StartPlateSequencerBlockDefinition,
#     "end-plate-sequencer": EndPlateSequencerBlockDefinition,
# }

# class BlockDefinition:
#     @classmethod
#     def __get_validators__(cls):
#         yield cls.return_action

#     @classmethod
#     def return_action(cls, values):
#         try:
#             block_definition_type = values["type"]
#         except KeyError:
#             raise MalformedAction(
#                 f"Missing required 'type' field for block definition: {values}"
#             )
#         try:
#             return BLOCK_DEFINITIONS[block_definition_type](**values)
#         except KeyError:
#             raise MalformedAction(f"Incorrect block definition: {values}")

BlockDefinition = Union[
    TextQuestionBlockDefinition,
    OptionsQuestionBlockDefinition,
    CalculatorBlockDefinition,
    PlateSamplerBlockDefinition,
    PlateAddReagentBlockDefinition,
    AddReagentBlockDefinition,
    StartTimestampBlockDefinition,
    EndTimestampBlockDefinition,
    StartPlateSequencerBlockDefinition,
    EndPlateSequencerBlockDefinition,
]

class SectionDefinition(BaseModel):
    id: str
    name: Optional[str]
    blocks: Optional[List[BlockDefinition]]
    requiresSignature: Optional[bool]
    requiresWitness: Optional[bool]

class ProtocolModel(AuditedModel):
    id: Optional[str]
    protocol_id: Optional[int]
    version_id: Optional[int]
    name: Optional[str]
    description: Optional[str]

    sections: Optional[List[SectionDefinition]]

    signature: Optional[str]
    witness: Optional[str]
    signedOn: Optional[str]
    witnessedOn: Optional[str]

class ProtocolsModel(PaginatedModel):
    protocols: List[ProtocolModel]


# Run -------------------------------------------------------------------------

class VariableValue(BaseModel):
    id: Optional[str]
    value: Optional[float]

class PlateMapping(BaseModel):
    label: str
    coordinates: Optional[List[PlateCoordinate]]
    primer: Optional[str]

class TextQuestionBlock(BaseModel):
    type: Literal['text-question'] = 'text-question'
    definition: TextQuestionBlockDefinition

    answer: Optional[str]

class OptionsQuestionBlock(BaseModel):
    type: Literal['options-question'] = 'options-question'
    definition: OptionsQuestionBlockDefinition

    answer: Optional[str]

class CalculatorBlock(BaseModel):
    type: Literal['calculator'] = 'calculator'
    definition: CalculatorBlockDefinition

    values: Optional[List[VariableValue]]

class PlateSamplerBlock(BaseModel):
    type: Literal['plate-sampler'] = 'plate-sampler'
    definition: PlateSamplerBlockDefinition

    plates: Optional[List[Optional[PlateMapping]]]

    outputPlateLabel: Optional[str]

class PlateAddReagentBlock(BaseModel):
    type: Literal['plate-add-reagent'] = 'plate-add-reagent'
    definition: PlateAddReagentBlockDefinition

    plateLabel: Optional[str]
    plateLot: Optional[str]

    values: Optional[List[VariableValue]]

class AddReagentBlock(BaseModel):
    type: Literal['add-reagent'] = 'add-reagent'
    definition: AddReagentBlockDefinition

    reagentLot: Optional[str]

    values: Optional[List[VariableValue]]

class StartTimestampBlock(BaseModel):
    type: Literal['start-timestamp'] = 'start-timestamp'
    definition: StartTimestampBlockDefinition

    timestampLabel: Optional[str]
    startedOn: Optional[str]

class EndTimestampBlock(BaseModel):
    type: Literal['end-timestamp'] = 'end-timestamp'
    definition: EndTimestampBlockDefinition

    timestampLabel: Optional[str]
    endedOn: Optional[str]

class StartPlateSequencerBlock(BaseModel):
    type: Literal['start-plate-sequencer'] = 'start-plate-sequencer'
    definition: StartPlateSequencerBlockDefinition

    plateLabels: Optional[List[str]]
    timestampLabel: Optional[str]
    startedOn: Optional[str]

class EndPlateSequencerBlock(BaseModel):
    type: Literal['end-plate-sequencer'] = 'end-plate-sequencer'
    definition: EndPlateSequencerBlockDefinition

    attachments: Optional[List[AttachmentModel]]
    plateSequencingResults: Optional[List[PlateResult]]
    timestampLabel: Optional[str]
    endedOn: Optional[str]

# BLOCKS = {
#     "text-question": TextQuestionBlock,
#     "options-question": OptionsQuestionBlock,
#     "calculator": CalculatorBlock,
#     "plate-sampler": PlateSamplerBlock,
#     "plate-add-reagent": PlateAddReagentBlock,
#     "add-reagent": AddReagentBlock,
#     "start-timestamp": StartTimestampBlock,
#     "end-timestamp": EndTimestampBlock,
#     "start-plate-sequencer": StartPlateSequencerBlock,
#     "end-plate-sequencer": EndPlateSequencerBlock,
# }

# class Block:
#     @classmethod
#     def __get_validators__(cls):
#         yield cls.return_action

#     @classmethod
#     def __modify_schema__(cls, field_schema):
#         ...

#     @classmethod
#     def return_action(cls, values):
#         try:
#             block_type = values["type"]
#         except KeyError:
#             raise MalformedAction(
#                 f"Missing required 'type' field for block: {values}"
#             )
#         try:
#             return BLOCKS[block_type](**values)
#         except KeyError:
#             raise MalformedAction(f"Incorrect block: {values}")

Block = Union[
    TextQuestionBlock,
    OptionsQuestionBlock,
    CalculatorBlock,
    PlateSamplerBlock,
    PlateAddReagentBlock,
    AddReagentBlock,
    StartTimestampBlock,
    EndTimestampBlock,
    StartPlateSequencerBlock,
    EndPlateSequencerBlock,
]

class Section(BaseModel):
    blocks: Optional[List[Block]]

    definition: SectionDefinition

    signature: Optional[str]
    witness: Optional[str]

    signedOn: Optional[str]
    witnessedOn: Optional[str]

class RunModel(AuditedModel):
    id: Optional[str]
    run_id: Optional[int]
    version_id: Optional[int]
    # TODO: Add version_id.
    name: Optional[str]
    notes: Optional[str]
    status: Optional[str]

    sections: Optional[List[Section]]

    sampleOverrides: Optional[List[SampleResult]]

    protocol: Optional[ProtocolModel]

class RunsModel(PaginatedModel):
    runs: List[RunModel]
