
/**
* Created by nghinv on Thu May 31 2018
* Copyright (c) 2018 nghinv
*/

'use strick';

import { all, fork } from 'redux-saga/effects';
import * as jobSolutions from './jobSolutions';

export default function* rootSaga() {
    yield all([
        ...Object.values(jobSolutions),
    ].map(fork));
}
