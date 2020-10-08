import { get } from "lodash";
export const isMicroEnv = () => !!get(window, "__POWERED_BY_QIANKUN__");
