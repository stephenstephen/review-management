import { Outlet, Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuth } from '@/features/auth/context/AuthContext';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Layout() {
  const { logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="p-4 border-b flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">ReviewApp</Link>
        <nav className="space-x-4">
          <Link
            to="/"
            className={cn("text-sm font-medium", pathname === "/" && "underline")}
          >
            Accueil
          </Link>
          {
            !isAuthenticated &&
            <Link
              to="/login"
              className={cn("text-sm font-medium", pathname === "/login" && "underline")}
            >
              Connexion
            </Link>
          }
          {
            isAuthenticated &&
            <>
              <Link
                to="/dashboard"
                className={cn("text-sm font-medium", pathname === "/dashboard" && "underline")}
              >
                Dashboard
              </Link>
              <Button
                variant="outline"
                className="text-red-600 hover:text-red-800 border-red-600 hover:border-red-800"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Déconnexion
              </Button>
            </>
          }
        </nav>
      </header>
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
}
