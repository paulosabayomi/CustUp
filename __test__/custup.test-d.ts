import {expectType} from 'tsd';
import CustUp from '../src/custup'

const instance1 = new CustUp({})

expectType<CustUp>(instance1);
expectType<CustUp | undefined>(instance1.initializeUI());