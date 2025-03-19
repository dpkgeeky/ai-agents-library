import { AgentConfig, AgentFactory } from "./interfaces";
import { LangChainAgent } from "../agents/langchain/langchain-agent";
import { OllamaAgent, OllamaConfig } from "../agents/ollama/ollama-agent";

export enum AgentType {
  LANGCHAIN = "langchain",
  OLLAMA = "ollama",
}

export class AgentFactoryImpl implements AgentFactory {
  createAgent(config: AgentConfig): LangChainAgent | OllamaAgent {
    if (config.type === AgentType.OLLAMA) {
      return new OllamaAgent(config as OllamaConfig);
    }
    return new LangChainAgent(config);
  }
}

export const createAgent = (config: AgentConfig): LangChainAgent | OllamaAgent => {
  const factory = new AgentFactoryImpl();
  return factory.createAgent(config);
}; 