# `micro-front-child`

> 基于 qinkun，提供与父应用的事件通信方式

## Usage 注册

```
import { mountEvents, unmountEvents } from "@bridge-start/micro-front-child";

//在qiankun生命周期中注册与清除事件

export const mount = async (props: any) => {
  render(props);
  mountEvents(props);//注册
};

export const unmount = async (props: any) => {
  const { container } = props;
  ReactDOM.unmountComponentAtNode(container ? container.querySelector("#root") : document.querySelector("#root"));

  unmountEvents();//清除
};
```

## Usage 通信

```$xslt
import {
  sendStateToFather,            //向父应用发送事件
  registerFatherStateListener,  //注册接收父应用事件的监听
  removeFatherStateListener,    //清楚事件
} from "@bridge-start/micro-front-child";

export const ReceiveDemo = () => {
  const [init, setInit] = useState<IData["params"]>();
  useEffect(() => {
    const handleInitParams = (data: IData) => {
      setInit(data.params);
    };
    registerFatherStateListener(handleInitParams, "init");
    return () => {
      removeFatherStateListener(handleInitParams);
    };
  }, []);
  return (
    <div>
      <p>接收到Father init参数:</p>
      <p>{JSON.stringify(init)}</p>
    </div>
  );
};

```

详细使用方式见 [example/micro-child](https://github.com/zxeryu/start/tree/master/example/micro-child)
