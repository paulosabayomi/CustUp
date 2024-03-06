import {expectType} from 'tsd';
import CustUp from '../src/custup'
import {ICustUpOptions} from '../types/types'

const instance1 = new CustUp({} as ICustUpOptions);
const instance2 = new CustUp({autoInitialize: false} as ICustUpOptions);

expectType<CustUp>(instance1);
expectType<CustUp | undefined>(instance2.initializeUI());