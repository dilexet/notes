import React from 'react';
import Footer from './component/footer';
import Header from './component/header';
import AppRoutes from './features/routes';

const App: React.FC = () => {
  return (
    <div className="container">
      <div className="wrapper">
        <Header />
        <main className="main-content">
          <AppRoutes />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default App;
