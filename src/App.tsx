import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './scenes/Home';
import Recipe from './scenes/Recipe';
import { QueryClient, QueryClientProvider } from 'react-query';

function App() {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <BrowserRouter>
        <main>
          <Switch>
            <Route
              path="/recipe/:id"
              render={({ match }) => <Recipe mealId={match.params.id} />}
            />
            <Route path="/" component={Home} />
          </Switch>
        </main>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
