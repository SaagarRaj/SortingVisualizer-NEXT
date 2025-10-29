# 🎯 Sorting Visualizer

An interactive web application that visualizes various sorting algorithms in real-time. Watch as different sorting strategies work their magic through animated bar charts, making complex algorithms easy to understand and learn.

<img width="1297" height="939" alt="Screenshot 2025-10-28 at 10 01 11 PM" src="https://github.com/user-attachments/assets/29a42f4c-672d-4697-9062-d6070bf9a2ce" />


## 🌟 Features

- **5 Sorting Algorithms**: Bubble Sort, Quick Sort, Merge Sort, Insertion Sort, Selection Sort
- **Real-time Animation**: Step-by-step visualization with smooth transitions
- **Speed Control**: Adjustable animation speed from slow to fast
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Educational Content**: Detailed algorithm descriptions and time complexity
- **Celebration Effects**: Confetti animation when sorting completes
- **Interactive Controls**: Easy-to-use interface with intuitive controls

## 🚀 Live Demo

Experience the sorting visualizer in action: [Live Demo](https://sorting-visualizer-next-beta.vercel.app)

## 🛠️ Technologies Used

### **Frontend Framework**

- **[Next.js 14](https://nextjs.org/)** - React framework with App Router
- **[React 18](https://reactjs.org/)** - UI library with hooks and context
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript

### **Styling & UI**

- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[React Icons](https://react-icons.github.io/react-icons/)** - Icon library
- **Custom CSS Animations** - Smooth transitions and effects

### **State Management**

- **React Context API** - Global state management
- **Custom Hooks** - Reusable state logic

### **Development Tools**

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **PostCSS** - CSS processing

### **Deployment & Containerization**

- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **Multi-stage builds** - Optimized production images

## 🎨 How the Visualization Works

### **1. Bar Generation System**

The visualizer creates bars dynamically based on screen size:

```typescript
// Calculate number of bars based on container width
const contentContainerWidth = contentContainer.clientWidth;
const numlines = contentContainerWidth / 8; // Each bar takes ~8px

// Generate random heights
const maxLineHeight = Math.max(containerHeight - headerHeight, 100);
for (let i = 0; i < numlines; i++) {
  tempArray.push(generateRandomNumberFromInterval(35, maxLineHeight));
}
```

**What happens:**

- Screen width ÷ 8 = Number of bars that fit
- Each bar gets a random height between 35px and maxHeight
- Bars are rendered as `<div>` elements with dynamic heights

### **2. Animation Pipeline**

The visualization uses a sophisticated animation system:

#### **Step 1: Algorithm Execution**

```typescript
// Algorithms don't sort the real array - they create animation steps
function runBubbleSort(array: number[], animations: AnimationArrayType) {
  for (let i = 0; i < array.length - 1; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      // Record comparison
      animations.push([[j, j + 1], false]);

      if (array[j] > array[j + 1]) {
        // Record swaps
        animations.push([[j, array[j + 1]], true]);
        animations.push([[j + 1, array[j]], true]);
      }
    }
  }
}
```

#### **Step 2: Animation Execution**

```typescript
// Execute each animation step with timing
animations.forEach((animation, index) => {
  setTimeout(() => {
    const [values, isSwap] = animation;

    if (!isSwap) {
      // Highlight bars being compared (green flash)
      updateClassList(values, "changed-line-color", "default-line-color");
    } else {
      // Change bar heights to show swaps
      updateHeightValue(lineIndex, newHeight);
    }
  }, index * inverseSpeed);
});
```

### **3. Visual Effects System**

#### **Color States:**

- **White bars** (`default-line-color`) - Normal state
- **Green bars** (`changed-line-color`) - Currently being compared
- **Height changes** - Visual representation of swaps

#### **Animation Types:**

1. **Comparison Animation**: Bars flash green when being compared
2. **Swap Animation**: Bar heights change to show element movement
3. **Completion Animation**: All bars pulse green when sorting finishes

### **4. Speed Control System**

The speed slider controls animation timing:

```typescript
// Convert slider value to delay
const inverseSpeed = (1 / animationSpeed) * 200;

// Apply delay to each animation step
setTimeout(() => {
  // Execute animation step
}, index * inverseSpeed);
```

**Speed Range:**

- **100 (Slow)**: 2ms delay between steps
- **400 (Fast)**: 0.5ms delay between steps

## 🏗️ Project Architecture

### **File Structure**

```
src/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Main UI component
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/            # Reusable components
│   ├── Input/            # Control components
│   │   ├── Slider.tsx    # Speed control
│   │   └── Select.tsx    # Algorithm selector
│   └── Confetti.tsx      # Celebration effect
├── context/              # State management
│   └── Visualizer.tsx    # Main state and animation logic
├── algorithms/           # Sorting implementations
│   ├── bubbleSort.ts
│   ├── quickSort.ts
│   ├── insertionSort.ts
│   ├── selectionSort.ts
│   └── mergeSort.ts
└── shared/               # Utilities and types
    ├── types.ts          # TypeScript definitions
    └── utils.ts          # Helper functions
```

### **State Management Flow**

```
User Input → Context State → Algorithm → Animation → Visual Update
    ↓           ↓           ↓          ↓           ↓
  "Play" → Generate → Create → Execute → Show
  Button    Array    Steps    Steps    Bars
```

## 🎯 Algorithm Implementations

### **Bubble Sort**

- **Method**: Compare adjacent elements and swap if needed
- **Visualization**: Shows adjacent comparisons and swaps
- **Time Complexity**: O(n²)

### **Quick Sort**

- **Method**: Divide and conquer with pivot selection
- **Visualization**: Highlights pivot comparisons and partitioning
- **Time Complexity**: O(n log n) average, O(n²) worst

### **Merge Sort**

- **Method**: Divide array into halves, sort, then merge
- **Visualization**: Shows divide-and-conquer process
- **Time Complexity**: O(n log n)

### **Insertion Sort**

- **Method**: Build sorted array one element at a time
- **Visualization**: Shows element insertion into sorted portion
- **Time Complexity**: O(n²)

### **Selection Sort**

- **Method**: Find minimum element and place at beginning
- **Visualization**: Shows minimum finding and placement
- **Time Complexity**: O(n²)

## 📱 Responsive Design

### **Mobile Layout (Percentage-based)**

- **40%** - Controls and description area
- **2%** - Padding between sections
- **50%** - Bar visualization area
- **8%** - Bottom padding

### **Desktop Layout**

- **Fixed header** with controls
- **Overlay description** panel
- **Full-height** visualization area

## 🚀 Getting Started

### Option 1: Local Development

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🎓 Educational Value

### **Learning Outcomes**

- **Algorithm Understanding**: Visualize how different sorting strategies work
- **Time Complexity**: See the difference between O(n²) and O(n log n) algorithms
- **Step-by-step Learning**: Watch each comparison and swap in real-time
- **Interactive Learning**: Control speed and replay animations
- **Visual Memory**: Associate algorithms with their visual patterns

### **Perfect For**

- **Computer Science Students** - Learn sorting algorithms visually
- **Coding Bootcamp Participants** - Understand algorithm efficiency
- **Interview Preparation** - Practice explaining sorting algorithms
- **Educators** - Teach algorithms with interactive demonstrations
- **Anyone Curious** - Explore computer science concepts

### **Algorithm Comparison**

| Algorithm      | Best Case  | Average Case | Worst Case | Stability | Space    |
| -------------- | ---------- | ------------ | ---------- | --------- | -------- |
| Bubble Sort    | O(n)       | O(n²)        | O(n²)      | Stable    | O(1)     |
| Quick Sort     | O(n log n) | O(n log n)   | O(n²)      | Unstable  | O(log n) |
| Merge Sort     | O(n log n) | O(n log n)   | O(n log n) | Stable    | O(n)     |
| Insertion Sort | O(n)       | O(n²)        | O(n²)      | Stable    | O(1)     |
| Selection Sort | O(n²)      | O(n²)        | O(n²)      | Unstable  | O(1)     |

## 🔧 Technical Deep Dive

### **Animation System Architecture**

The visualization system uses a sophisticated three-layer architecture:

#### **1. Algorithm Layer**

- Pure sorting logic without UI dependencies
- Records every operation as animation steps
- Returns structured animation data

#### **2. Animation Engine**

- Processes animation steps with timing
- Manages DOM updates and visual effects
- Handles speed control and state management

#### **3. Visual Layer**

- Renders bars and applies CSS classes
- Manages responsive layout and styling
- Provides user interaction and feedback

### **Performance Optimizations**

- **Efficient DOM Updates**: Batch class changes and height updates
- **Memory Management**: Clean up timeouts and intervals
- **Responsive Design**: Dynamic bar count based on screen size
- **Smooth Animations**: 60fps animation with requestAnimationFrame
- **Code Splitting**: Lazy load algorithm implementations

### **State Management Pattern**

```typescript
// Centralized state with React Context
const SortingContext = {
  arrayToSort: number[],           // Current bar heights
  selectedAlgorithm: string,       // Active algorithm
  isSorting: boolean,             // Animation state
  animationSpeed: number,         // Speed control
  showConfetti: boolean,          // Celebration state
}
```

## 🎨 Customization & Extensibility

### **Adding New Algorithms**

1. Create new file in `src/algorithms/`
2. Implement animation step generation
3. Add to algorithm options in `utils.ts`
4. Update algorithm data with descriptions

### **Customizing Visual Effects**

- Modify CSS classes in `globals.css`
- Adjust animation timing in `Visualizer.tsx`
- Add new visual states for different operations

### **Responsive Breakpoints**

- Mobile: `< 640px` - Stacked layout
- Tablet: `640px - 1024px` - Hybrid layout
- Desktop: `> 1024px` - Horizontal layout

## 🐛 Troubleshooting

### **Common Issues**

1. **Animation not smooth**

   - Check browser performance settings
   - Reduce number of bars for better performance
   - Ensure hardware acceleration is enabled

2. **Bars not visible**

   - Check container height calculations
   - Verify CSS classes are applied correctly
   - Ensure proper responsive breakpoints

3. **Speed control not working**
   - Verify slider value is updating state
   - Check animation timing calculations
   - Ensure no conflicting timeouts

### **Debug Mode**

Enable debug logging by adding to `Visualizer.tsx`:

```typescript
console.log("Animation steps:", animations.length);
console.log("Speed setting:", animationSpeed);
console.log("Array size:", arrayToSort.length);
```

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### **Ways to Contribute**

- **Add new algorithms** (Heap Sort, Radix Sort, etc.)
- **Improve animations** (new visual effects, transitions)
- **Enhance UI/UX** (better controls, themes, accessibility)
- **Fix bugs** and improve performance
- **Add tests** and documentation

### **Development Setup**

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js Team** - Amazing React framework
- **Tailwind CSS** - Beautiful utility-first CSS
- **React Icons** - Comprehensive icon library
- **Computer Science Community** - Algorithm implementations and concepts

---

**Made with ❤️ for the coding community**

### Option 2: Docker Development

For development with hot reloading:

```bash
# Build and run development container
docker-compose --profile dev up sorting-visualizer-dev

# Or build manually
docker build -f Dockerfile.dev -t sorting-visualizer-dev .
docker run -p 3001:3000 -v $(pwd):/app sorting-visualizer-dev
```

### Option 3: Docker Production

For production deployment:

```bash
# Build and run production container
docker-compose up sorting-visualizer

# Or build manually
docker build -t sorting-visualizer .
docker run -p 3000:3000 sorting-visualizer
```

## Docker Commands

### Production Build

```bash
# Build the production image
docker build -t sorting-visualizer .

# Run the container
docker run -p 3000:3000 sorting-visualizer

# Run in detached mode
docker run -d -p 3000:3000 --name sorting-viz sorting-visualizer
```

### Development Build

```bash
# Build the development image
docker build -f Dockerfile.dev -t sorting-visualizer-dev .

# Run with volume mounting for hot reload
docker run -p 3001:3000 -v $(pwd):/app sorting-visualizer-dev
```

### Docker Compose

```bash
# Production
docker-compose up

# Development
docker-compose --profile dev up

# Build and run
docker-compose up --build

# Stop services
docker-compose down
```

## Docker Features

### Production Optimizations

- **Multi-stage build**: Reduces final image size
- **Alpine Linux**: Lightweight base image
- **Standalone output**: Optimized Next.js build
- **Non-root user**: Security best practices
- **Health checks**: Container monitoring

### Development Features

- **Hot reloading**: Live code changes
- **Volume mounting**: Source code synchronization
- **Development dependencies**: Full dev environment

## Environment Variables

The following environment variables can be configured:

```bash
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
PORT=3000
HOSTNAME=0.0.0.0
```

## Deployment

### Docker Hub

```bash
# Tag your image
docker tag sorting-visualizer your-username/sorting-visualizer:latest

# Push to Docker Hub
docker push your-username/sorting-visualizer:latest
```

### Kubernetes

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: sorting-visualizer
spec:
  replicas: 3
  selector:
    matchLabels:
      app: sorting-visualizer
  template:
    metadata:
      labels:
        app: sorting-visualizer
    spec:
      containers:
        - name: sorting-visualizer
          image: your-username/sorting-visualizer:latest
          ports:
            - containerPort: 3000
          resources:
            requests:
              memory: "128Mi"
              cpu: "100m"
            limits:
              memory: "256Mi"
              cpu: "200m"
```

## Troubleshooting

### Common Issues

1. **Port already in use**

   ```bash
   # Check what's using port 3000
   lsof -i :3000

   # Use different port
   docker run -p 3001:3000 sorting-visualizer
   ```

2. **Build fails**

   ```bash
   # Clear Docker cache
   docker system prune -a

   # Rebuild without cache
   docker build --no-cache -t sorting-visualizer .
   ```

3. **Container won't start**

   ```bash
   # Check logs
   docker logs <container-id>

   # Run with interactive shell
   docker run -it sorting-visualizer sh
   ```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
