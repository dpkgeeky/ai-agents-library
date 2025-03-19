declare module '@langchain/core/language_models/base' {
  export interface BaseLanguageModel {
    invoke(input: string): Promise<{ content: string }>;
  }
}

declare module '@langchain/core/tools' {
  export interface Tool {
    name: string;
    description: string;
    call(input: string): Promise<string>;
  }
}

declare module '@langchain/core/runnables' {
  export interface Runnable {
    invoke(input: any): Promise<any>;
  }
}

declare module '@langchain/langgraph' {
  export class StateGraph {
    constructor(config: { channels: string[] });
    addNode(id: string, node: (state: any) => Promise<any>): void;
    addEdge(from: string, to: string): void;
    addConditionalEdges(from: string, to: string, condition: (state: any) => boolean): void;
    setEntryPoint(id: string): void;
    invoke(input: any): Promise<any>;
  }
}

declare module '@langchain/openai' {
  import { BaseLanguageModel } from '@langchain/core/language_models/base';
  export class ChatOpenAI implements BaseLanguageModel {
    constructor(config: { modelName: string; temperature: number });
    invoke(input: string): Promise<{ content: string }>;
  }
}

declare module '@langchain/core' {
  export * from '@langchain/core/language_models/base';
  export * from '@langchain/core/tools';
  export * from '@langchain/core/runnables';
} 