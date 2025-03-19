# AI Agents Library

A TypeScript library for creating AI agents with graph support, built on top of LangChain and LangGraph. This library provides a flexible and extensible framework for building AI agent systems with graph-based workflows.

## Features

- 🎯 TypeScript-first approach with full type safety
- 🔄 Graph-based agent workflows using LangGraph
- 🤖 Extensible agent implementations (currently supports LangChain and Ollama, with AutoGen support planned)
- 🔌 Flexible LLM integration (OpenAI, Ollama/Llama)
- 📦 Modular architecture for easy extension
- 🧪 Comprehensive test coverage
- 📚 Detailed documentation and examples

## Installation

```bash
npm install ai-agents-library
```

## Quick Start

### Using OpenAI (LangChain)

```typescript
import { createAgent, AgentType } from 'ai-agents-library';
import { ChatOpenAI } from '@langchain/openai';

// Create an LLM instance
const llm = new ChatOpenAI({
  modelName: 'gpt-4',
  temperature: 0,
});

// Create a basic agent
const agent = createAgent({
  type: AgentType.LANGCHAIN,
  llm,
  tools: [], // Add your tools here
});

// Create a graph workflow
const workflow = agent.createGraph({
  nodes: [
    // Define your graph nodes
  ],
  edges: [
    // Define your graph edges
  ],
});

// Run the workflow
const result = await workflow.run({
  input: "Your input here"
});
```

### Using Ollama (Llama)

```typescript
import { createAgent, AgentType } from 'ai-agents-library';

// Create an Ollama agent with Llama
const agent = createAgent({
  type: AgentType.OLLAMA,
  model: "llama2", // or any other Llama model you have pulled in Ollama
  temperature: 0.7,
  verbose: true,
});

// Create a graph workflow
const workflow = agent.createGraph({
  nodes: [
    {
      id: "input",
      type: "input",
      config: {},
    },
    {
      id: "process",
      type: "process",
      config: {
        prompt: "Process the input",
      },
    },
    {
      id: "output",
      type: "output",
      config: {},
    },
  ],
  edges: [
    {
      from: "input",
      to: "process",
    },
    {
      from: "process",
      to: "output",
    },
  ],
});

// Run the workflow
const result = await workflow.run({
  input: "Your input here"
});
```

## Architecture

The library is built with a modular architecture that allows for easy extension:

### Core Components

1. **Interfaces** (`src/core/interfaces.ts`)
   - `AgentConfig`: Configuration for creating agents
   - `GraphConfig`: Configuration for graph workflows
   - `Agent`: Base interface for all agent implementations
   - `AgentGraph`: Interface for graph-based workflows

2. **Agent Factory** (`src/core/agent-factory.ts`)
   - Creates different types of agents
   - Currently supports LangChain and Ollama agents
   - Extensible for future agent types

3. **Agent Implementations** (`src/agents/`)
   - `langchain/`: LangChain-based agent implementation
   - `ollama/`: Ollama-based agent implementation with Llama support
   - Future implementations (AutoGen, etc.) can be added here

### Graph Workflow

The library uses LangGraph for creating graph-based workflows:

```typescript
const workflow = agent.createGraph({
  nodes: [
    {
      id: "input",
      type: "input",
      config: {
        // Node-specific configuration
      }
    },
    {
      id: "process",
      type: "process",
      config: {
        prompt: "Process the input"
      }
    }
  ],
  edges: [
    {
      from: "input",
      to: "process",
      condition: (state) => state.shouldProcess // Optional condition
    }
  ]
});
```

## Advanced Usage

### Custom Node Types

You can create custom node types by extending the base node interface:

```typescript
interface CustomNode extends GraphNode {
  type: "custom";
  config: {
    customConfig: string;
  };
}
```

### Conditional Edges

Create complex workflows with conditional edges:

```typescript
const workflow = agent.createGraph({
  nodes: [
    {
      id: "start",
      type: "input",
      config: {}
    },
    {
      id: "process1",
      type: "process",
      config: {}
    },
    {
      id: "process2",
      type: "process",
      config: {}
    }
  ],
  edges: [
    {
      from: "start",
      to: "process1",
      condition: (state) => state.type === "type1"
    },
    {
      from: "start",
      to: "process2",
      condition: (state) => state.type === "type2"
    }
  ]
});
```

### Tool Integration

Add tools to your agents:

```typescript
import { Tool } from "@langchain/core/tools";

const tools: Tool[] = [
  // Define your tools here
];

const agent = createAgent({
  type: AgentType.LANGCHAIN, // or AgentType.OLLAMA
  llm,
  tools,
  verbose: true
});
```

## Ollama Integration

The library supports Ollama integration for running Llama models locally:

### Prerequisites

1. Install Ollama from [https://ollama.ai](https://ollama.ai)
2. Pull the desired Llama model:
   ```bash
   ollama pull llama2
   ```

### Configuration

When creating an Ollama agent, you can specify various options:

```typescript
const agent = createAgent({
  type: AgentType.OLLAMA,
  model: "llama2", // or any other model you have pulled
  baseUrl: "http://localhost:11434", // optional, defaults to this
  temperature: 0.7, // optional
  maxTokens: 1000, // optional
  verbose: true
});
```

## Development

### Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Build the library:
   ```bash
   npm run build
   ```

### Running Tests

```bash
npm test
```

### Running Examples

```bash
# Run OpenAI example
npm run example

# Run Ollama example
npm run example:ollama
```

## Testing

The library includes comprehensive tests covering:

- Agent creation and configuration
- Graph workflow execution
- Node and edge handling
- Tool integration
- Error handling
- State management
- Ollama integration

Run the test suite:
```bash
npm test
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT

## Acknowledgments

- [LangChain](https://github.com/langchain-ai/langchain)
- [LangGraph](https://github.com/langchain-ai/langgraph)
- [Ollama](https://github.com/ollama/ollama) 