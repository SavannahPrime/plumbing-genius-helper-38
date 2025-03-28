
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { MenuIcon, Home, MessageSquare, Wrench, Tool, Lightbulb, X, Crown } from 'lucide-react';
import { specialtyCategories } from '@/data/specialtyCategories';

interface Route {
  label: string;
  path: string;
  icon?: React.ReactNode;
}

const routes: Route[] = [
  {
    label: 'Home',
    path: '/',
    icon: <Home className="mr-2 h-4 w-4" />,
  },
  {
    label: 'Chat',
    path: '/chat',
    icon: <MessageSquare className="mr-2 h-4 w-4" />,
  },
  {
    label: 'Diagnosis',
    path: '/diagnosis',
    icon: <Lightbulb className="mr-2 h-4 w-4" />,
  },
  {
    label: 'Fixes',
    path: '/fixes',
    icon: <Wrench className="mr-2 h-4 w-4" />,
  },
  {
    label: 'Subscription',
    path: '/subscription',
    icon: <Crown className="mr-2 h-4 w-4" />,
  },
];

const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <header className="bg-white border-b sticky top-0 z-30">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2">
            <Tool className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">Connect.AI</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {routes.map((route) => (
              <Link
                key={route.path}
                to={route.path}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {route.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/subscription" className="hidden md:block">
            <Button variant="outline" size="sm" className="gap-1.5">
              <Crown className="h-4 w-4" />
              <span>Upgrade</span>
            </Button>
          </Link>
          
          <Link to="/chat">
            <Button size="sm" className="hidden md:flex gap-1.5">
              <MessageSquare className="h-4 w-4" />
              <span>Start Chatting</span>
            </Button>
          </Link>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <MenuIcon className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64 sm:w-80">
              <div className="flex h-full flex-col">
                <div className="flex items-center justify-between border-b py-4">
                  <div className="flex items-center gap-2">
                    <Tool className="h-5 w-5 text-primary" />
                    <span className="font-semibold">Connect.AI</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Close</span>
                  </Button>
                </div>
                <div className="flex-1 overflow-auto py-4">
                  <nav className="grid gap-2">
                    {routes.map((route) => (
                      <Link
                        key={route.path}
                        to={route.path}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                      >
                        {route.icon}
                        {route.label}
                      </Link>
                    ))}

                    <div className="my-2 border-t pt-2">
                      <div className="px-3 py-2 text-xs font-medium text-muted-foreground">
                        AI Assistants
                      </div>
                      {specialtyCategories.map((category) => (
                        <Link
                          key={category.id}
                          to={category.path}
                          onClick={() => setIsOpen(false)}
                          className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                        >
                          <div className="h-4 w-4">{category.icon}</div>
                          {category.name}
                          {category.requiresSubscription && (
                            <Crown className="h-3 w-3 text-amber-500 ml-1" />
                          )}
                        </Link>
                      ))}
                    </div>
                  </nav>
                </div>
                <div className="border-t p-4">
                  <Link to="/subscription" onClick={() => setIsOpen(false)}>
                    <Button className="w-full gap-1.5">
                      <Crown className="h-4 w-4" />
                      <span>Upgrade to Premium</span>
                    </Button>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
