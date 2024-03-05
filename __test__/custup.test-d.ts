import {expectType} from 'tsd';
import CustUp from '../src/custup'
import {ICustUpOptions} from '../types/types'

const instance1 = new CustUp({} as ICustUpOptions);

expectType<CustUp>(instance1);
expectType<CustUp | undefined>(instance1.initializeUI());