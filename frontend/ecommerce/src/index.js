import 'bootstrap/dist/css/bootstrap.min.css';
import './utils/axiosInterceptor';
import { AuthProvider } from './context/AuthContext';

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something broke!' });
});


// ...
<CartProvider>
<AuthProvider>
  <App />
</AuthProvider>
</CartProvider>