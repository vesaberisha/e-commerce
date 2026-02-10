import 'bootstrap/dist/css/bootstrap.min.css';
import './utils/axiosInterceptor';
import { AuthProvider } from './context/AuthContext';


// ...
<CartProvider>
<AuthProvider>
  <App />
</AuthProvider>
</CartProvider>