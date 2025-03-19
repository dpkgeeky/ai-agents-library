import { BaseLanguageModel } from "@langchain/core/language_models/base";
import { Tool } from "@langchain/core/tools";
import { Runnable } from "@langchain/core/runnables";
import { StateGraph } from "@langchain/langgraph";
import { AgentType } from "./agent-factory";

export interface AgentConfig {
  type: AgentType;
  llm?: BaseLanguageModel;
  tools?: Tool[];
  verbose?: boolean;
}

export interface GraphConfig {
  nodes: GraphNode[];
  edges: GraphEdge[];
}

export interface GraphNode {
  id: string;
  type: string;
  config: Record<string, any>;
}

export interface GraphEdge {
  from: string;
  to: string;
  condition?: (state: any) => boolean;
}

export interface Agent {
  createGraph(config: GraphConfig): AgentGraph;
  run(input: string): Promise<string>;
}

export interface AgentGraph {
  run(input: Record<string, any>): Promise<Record<string, any>>;
}

export interface AgentFactory {
  createAgent(config: AgentConfig): Agent;
} 