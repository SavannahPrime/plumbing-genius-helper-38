
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight } from 'lucide-react';

interface ModernHeroProps {
  title?: string;
  specialty?: string;
  emoji?: string;
  description?: string;
  placeholderText?: string;
}

const ModernHero: React.FC<ModernHeroProps> = ({ 
  title = "Connect.AI",
  specialty,
  emoji,
  description = "Your AI-powered home repair assistant",
  placeholderText = "Describe your issue..."
}) => {
  const navigate = useNavigate();
  const [query, setQuery] = React.useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      const specialtyParam = specialty ? `&specialty=${specialty}` : '';
      navigate(`/chat?q=${encodeURIComponent(query)}${specialtyParam}`);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-16 sm:py-24">
      <div className="text-center max-w-3xl mx-auto">
        <div className="mb-4 text-4xl">{emoji}</div>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">{title}</h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          {description}
        </p>
        
        <form onSubmit={handleSubmit} className="flex gap-2 max-w-lg mx-auto mb-8">
          <Input
            type="text"
            placeholder={placeholderText}
            className="flex-1"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button type="submit">
            <ArrowRight className="h-4 w-4 mr-2" />
            Go
          </Button>
        </form>
        
        <div className="flex flex-wrap justify-center gap-4">
          <Button 
            variant="outline" 
            onClick={() => navigate(specialty ? `/chat?specialty=${specialty}` : '/chat')}
          >
            Start Chat
          </Button>
          <Button 
            variant="outline" 
            onClick={() => navigate(specialty ? `/diagnosis?specialty=${specialty}` : '/diagnosis')}
          >
            Upload Photo
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ModernHero;
