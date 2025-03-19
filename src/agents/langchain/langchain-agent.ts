import { BaseLanguageModel } from "@langchain/core/language_models/base";
import { Tool } from "@langchain/core/tools";
import { StateGraph } from "@langchain/langgraph";
import { Agent, AgentConfig, AgentGraph, GraphConfig } from "../../core/interfaces";
import { ChatOpenAI } from "@langchain/openai";

export class LangChainAgent implements Agent {
  private llm: BaseLanguageModel;
  private tools: Tool[];
  private verbose: boolean;

  constructor(config: AgentConfig) {
    this.llm = config.llm || new ChatOpenAI({
      modelName: "gpt-3.5-turbo",
      temperature: 0,
    });
    this.tools = config.tools || [];
    this.verbose = config.verbose || false;
  }

  createGraph(config: GraphConfig): AgentGraph {
    const graph = new StateGraph({
      channels: ["input", "output", "state"],
    });

    // Add nodes to the graph
    config.nodes.forEach((node) => {
      graph.addNode(node.id, this.createNode(node));
    });

    // Add edges to the graph
    config.edges.forEach((edge) => {
      if (edge.condition) {
        graph.addConditionalEdges(edge.from, edge.to, edge.condition);
      } else {
        graph.addEdge(edge.from, edge.to);
      }
    });

    // Set entry point
    graph.setEntryPoint(config.nodes[0].id);

    return {
      run: async (input: Record<string, any>) => {
        return await graph.invoke(input);
      },
    };
  }

  private createNode(node: any) {
    return async (state: any) => {
      if (node.type === "process") {
        const response = await this.llm.invoke(state.input);
        return {
          ...state,
          output: response.content,
        };
      }
      return state;
    };
  }

  async run(input: string): Promise<string> {
    const response = await this.llm.invoke(input);
    return response.content;
  }
} 