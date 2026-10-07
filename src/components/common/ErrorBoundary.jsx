import { Component } from 'react';
import Button from '../ui/Button.jsx';

export default class ErrorBoundary extends Component {
  state = { hasError: false, message: '' };
  static getDerivedStateFromError(error) { return { hasError: true, message: error.message }; }
  componentDidCatch(error, info) { console.error('Analytics ErrorBoundary:', error, info.componentStack); }
  render() {
    if (this.state.hasError) return <div className="error-fallback" role="alert">
      <strong>Не вдалося завантажити дані</strong>
      <p>{this.state.message}</p>
      <Button onClick={this.props.onRetry}>Спробувати ще раз</Button>
    </div>;
    return this.props.children;
  }
}
