.PHONY: setup dev build lint format typecheck clean

# Default target
all: setup

# Setup the project
setup:
	@echo "🚀 Setting up the project..."
	pnpm install
	@echo "✅ Setup complete!"

# Start development servers
dev:
	pnpm dev

# Build all packages
build:
	pnpm build

# Run linting
lint:
	pnpm lint

# Run formatting
format:
	pnpm format

# Run type checking
typecheck:
	pnpm typecheck

# Clean build artifacts and dependencies
clean:
	@echo "🧹 Cleaning build artifacts..."
	rm -rf node_modules
	rm -rf apps/*/node_modules
	rm -rf packages/*/node_modules
	rm -rf apps/*/dist
	rm -rf packages/*/dist
	rm -rf apps/*/.next
	@echo "✨ Clean complete!"

# Show help
help:
	@echo "Available targets:"
	@echo "  setup      - Install dependencies"
	@echo "  dev        - Start development servers"
	@echo "  build      - Build all packages"
	@echo "  lint       - Run linting"
	@echo "  format     - Run formatting"
	@echo "  typecheck  - Run type checking"
	@echo "  clean      - Remove build artifacts and dependencies" 