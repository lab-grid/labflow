import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import { initialRun, Run } from '../models/run';
import { auth0State } from '../state/atoms';
import { policyCheckQuery, runQuery } from '../state/selectors';
import { deleteRun, patchRun } from '../state/api';
import moment from 'moment';
import { RunEditor } from '../components/RunEditor';
import { compare } from 'fast-json-patch';

export interface RunEditorPageParams {
    id: string;
}

export function RunEditorPage() {
    const history = useHistory();
    const [runTimestamp, setRunTimestamp] = useState("");
    const [currentRun, setCurrentRun] = useState<Run>({});
    const { id } = useParams<RunEditorPageParams>();
    const run = useRecoilValue(runQuery({ runId: parseInt(id), queryTime: runTimestamp }));
    const policies = useRecoilValue(policyCheckQuery({ path: `run/${parseInt(id)}`, queryTime: runTimestamp }));
    const isWritable = policies.find(policy => policy.method === 'PUT') !== undefined;
    const isDeletable = policies.find(policy => policy.method === 'DELETE') !== undefined;
    const runUpsert = useRecoilCallback(({ snapshot }) => async (updatedRun: Run) => {
        try {
            const { auth0Client } = await snapshot.getPromise(auth0State);
            // TODO: Use an observer to gather these changes instead of this slow compare operation.
            const patch = compare(run || {}, updatedRun);
            const runId = updatedRun.id || parseInt(id);
            return await patchRun(() => auth0Client, runId, patch);
            // return await upsertRun(() => auth0Client, updatedRun);
        } finally {
            setRunTimestamp(moment().format());
            setCurrentRun({});
        }
    });
    const runArchive = useRecoilCallback(({ snapshot }) => async () => {
        try {
            const { auth0Client } = await snapshot.getPromise(auth0State);
            return await deleteRun(() => auth0Client, parseInt(id));
        } finally {
            history.push(`/`);
        }
    });

    return <RunEditor
        runUpsert={runUpsert}
        setRun={setCurrentRun}
        run={{...initialRun, ...run, ...currentRun}}
        onDelete={isDeletable ? runArchive : undefined}

        disabled={!isWritable}
    />
}
