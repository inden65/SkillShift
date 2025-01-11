declare module 'eliza' {
    class ElizaBot {
      transform(input: string): string;
      reset(): void;
    }
    export default ElizaBot;
  }  