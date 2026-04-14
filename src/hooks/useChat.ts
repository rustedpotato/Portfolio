import { useState } from 'react';

export type Message = {
  role: 'user' | 'ai';
  content: string;
};

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', content: "Hi! I'm Chaitanya's AI assistant. Ask me anything about their work, process, or availability." }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const newMessages: Message[] = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map(m => ({
            role: m.role === 'ai' ? 'assistant' : 'user',
            content: m.content
          }))
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch AI response');
      }

      const data = await response.json();
      
      setMessages((prev) => [
        ...prev,
        { role: 'ai', content: data.text || "Sorry, I couldn't understand that." }
      ]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        { role: 'ai', content: "Oops! Something went wrong. The server might be down or missing an API key." }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
  };
}
