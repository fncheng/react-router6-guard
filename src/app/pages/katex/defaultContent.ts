export const defaultContent = `

欧拉公式 \( e^{i\theta} = \cos\theta + i\sin\theta \) 的推导可以通过**泰勒级数展开**来实现。以下是详细步骤：

---

### 1. **泰勒级数的基础知识**
泰勒级数将函数展开为无限项的多项式形式。三个关键函数的泰勒展开式为：
- **指数函数** \\( e^x \\)：
  \\[
  e^x = 1 + x + \\frac{x^2}{2!} + \\frac{x^3}{3!} + \\frac{x^4}{4!} + \\cdots
  \\]
- **正弦函数** \( \sin x \)：
  \[
  \sin x = x - \frac{x^3}{3!} + \frac{x^5}{5!} - \frac{x^7}{7!} + \cdots
  \]
- **余弦函数** \( \cos x \)：
  \[
  \cos x = 1 - \frac{x^2}{2!} + \frac{x^4}{4!} - \frac{x^6}{6!} + \cdots
  \]

---

### 2. **将 \( x \) 替换为 \( i\theta \)**
将指数函数的泰勒级数中的 \( x \) 替换为 \( i\theta \)（其中 \( i \) 是虚数单位，满足 \( i^2 = -1 \)），得到：
\[
e^{i\theta} = 1 + i\theta + \frac{(i\theta)^2}{2!} + \frac{(i\theta)^3}{3!} + \frac{(i\theta)^4}{4!} + \cdots
\]

---

### 3. **展开并分离实部与虚部**
计算每一项的 \( i \) 的幂次，并分组为实部和虚部：
- \( i^0 = 1 \), \( i^1 = i \), \( i^2 = -1 \), \( i^3 = -i \), \( i^4 = 1 \), 以此类推。
  
展开后：
\[
e^{i\theta} = 1 + i\theta - \frac{\theta^2}{2!} - i\frac{\theta^3}{3!} + \frac{\theta^4}{4!} + i\frac{\theta^5}{5!} - \cdots
\]

**分离实部和虚部**：
- **实部**：\( 1 - \frac{\theta^2}{2!} + \frac{\theta^4}{4!} - \cdots \)，即 \( \cos\theta \) 的泰勒展开。
- **虚部**：\( i\left( \theta - \frac{\theta^3}{3!} + \frac{\theta^5}{5!} - \cdots \right) \)，即 \( i\sin\theta \) 的泰勒展开。

---

### 4. **合并结果**
将实部和虚部结合，得到：
\[
e^{i\theta} = \cos\theta + i\sin\theta
\]

---

### 5. **另一种方法：微分方程**
假设 \( f(\theta) = e^{i\theta} \)，对其求导：
\[
f'(\theta) = i e^{i\theta} = i f(\theta)
\]
同时，\( \cos\theta + i\sin\theta \) 的导数也是：
\[
\frac{d}{d\theta} (\cos\theta + i\sin\theta) = -\sin\theta + i\cos\theta = i(\cos\theta + i\sin\theta)
\]
由于两者满足相同的微分方程 \( f'(\theta) = i f(\theta) \)，且 `

export const defaultValue = {
    markdown:
        "欧拉公式（Euler's Formula）是数学中最重要的公式之一，它将复指数函数与三角函数联系起来，表述为：\n\n\\[\ne^{ix} = \\cos x + i \\sin x\n\\]\n\n特别地，当 \\( x = \\pi \\) 时，得到著名的 **欧拉恒等式（Euler's Identity）**：\n\n\\[\ne^{i\\pi} + 1 = 0\n\\]\n\n---\n\n## **欧拉公式的推导过程**\n\n### **方法1：泰勒级数展开（幂级数法）**\n这是最经典的推导方法，利用泰勒级数（Taylor Series）展开 \\( e^{ix} \\)、\\( \\cos x \\) 和 \\( \\sin x \\)。\n\n1. **指数函数 \\( e^{ix} \\) 的泰勒展开**：\n   \\[\n   e^{ix} = \\sum_{n=0}^{\\infty} \\frac{(ix)^n}{n!}\n   \\]\n   展开前几项：\n   \\[\n   e^{ix} = 1 + ix + \\frac{(ix)^2}{2!} + \\frac{(ix)^3}{3!} + \\frac{(ix)^4}{4!} + \\cdots\n   \\]\n   由于 \\( i^2 = -1 \\)，可以化简：\n   \\[\n   e^{ix} = 1 + ix - \\frac{x^2}{2!} - i\\frac{x^3}{3!} + \\frac{x^4}{4!} + i\\frac{x^5}{5!} - \\cdots\n   \\]\n\n2. **分离实部和虚部**：\n   \\[\n   e^{ix} = \\left(1 - \\frac{x^2}{2!} + \\frac{x^4}{4!} - \\cdots \\right) + i \\left(x - \\frac{x^3}{3!} + \\frac{x^5}{5!} - \\cdots \\right)\n   \\]\n   可以发现：\n   - 实部是 \\( \\cos x \\) 的泰勒展开：\n     \\[\n     \\cos x = 1 - \\frac{x^2}{2!} + \\frac{x^4}{4!} - \\cdots\n     \\]\n   - 虚部是 \\( \\sin x \\) 的泰勒展开：\n     \\[\n     \\sin x = x - \\frac{x^3}{3!} + \\frac{x^5}{5!} - \\cdots\n     \\]\n\n3. **合并结果**：\n   \\[\n   e^{ix} = \\cos x + i \\sin x\n   \\]\n   **欧拉公式得证！**\n\n---\n\n### **方法2：微分方程法**\n欧拉公式还可以通过解微分方程来推导。\n\n1. **定义复指数函数**：\n   我们希望 \\( f(x) = e^{ix} \\) 满足微分方程：\n   \\[\n   \\frac{df}{dx} = i f(x), \\quad f(0) = 1\n   \\]\n\n2. **假设解的形式**：\n   设 \\( f(x) = A(x) + i B(x) \\)，其中 \\( A(x) \\) 和 \\( B(x) \\) 是实函数。\n\n3. **代入微分方程**：\n   \\[\n   \\frac{d}{dx}(A + i B) = i (A + i B)\n   \\]\n   展开后得到：\n   \\[\n   A' + i B' = i A - B\n   \\]\n   比较实部和虚部：\n   \\[\n   \\begin{cases}\n   A' = -B \\\\\n   B' = A\n   \\end{cases}\n   \\]\n\n4. **求解微分方程**：\n   对 \\( A' = -B \\) 再求导：\n   \\[\n   A'' = -B' = -A\n   \\]\n   这是一个二阶常微分方程：\n   \\[\n   A'' + A = 0\n   \\]\n   其通解为：\n   \\[\n   A(x) = C_1 \\cos x + C_2 \\sin x\n   \\]\n   由于 \\( B = -A' \\)，所以：\n   \\[\n   B(x) = C_1 \\sin x - C_2 \\cos x\n   \\]\n\n5. **利用初始条件 \\( f(0) = 1 \\)**：\n   \\[\n   A(0) = C_1 = 1 \\\\\n   B(0) = -C_2 = 0 \\Rightarrow C_2 = 0\n   \\]\n   因此：\n   \\[\n   A(x) = \\cos x, \\quad B(x) = \\sin x\n   \\]\n   最终：\n   \\[\n   f(x) = \\cos x + i \\sin x = e^{ix}\n   \\]\n   **欧拉公式再次得证！**\n\n---\n\n### **方法3：极限法（复数的极坐标表示）**\n欧拉公式还可以通过复数的极坐标表示来理解。\n\n1. **复数 \\( e^{ix} \\) 的几何意义**：\n   - 在复平面上，\\( e^{ix} \\) 表示单位圆上的点，其角度为 \\( x \\) 弧度。\n   - 因此，它的实部是 \\( \\cos x \\)，虚部是 \\( \\sin x \\)。\n\n2. **利用极限定义**：\n   回忆指数函数的定义：\n   \\[\n   e^{ix} = \\lim_{n \\to \\infty} \\left(1 + \\frac{ix}{n}\\right)^n\n   \\]\n   当 \\( n \\) 很大时，\\( \\left(1 + \\frac{ix}{n}\\right) \\) 近似于：\n   \\[\n   1 + \\frac{ix}{n} \\approx \\text{旋转角度 } \\frac{x}{n}\n   \\]\n   连续相乘 \\( n \\) 次后，相当于旋转 \\( x \\) 弧度，因此：\n   \\[\n   e^{ix} = \\cos x + i \\sin x\n   \\]\n\n---\n\n## **欧拉恒等式的推导**\n当 \\( x = \\pi \\) 时：\n\\[\ne^{i\\pi} = \\cos \\pi + i \\sin \\pi = -1 + 0 = -1\n\\]\n因此：\n\\[\ne^{i\\pi} + 1 = 0\n\\]\n这就是著名的 **欧拉恒等式**，它包含了数学中最重要的五个常数：\n- \\( 0 \\)（加法单位元）\n- \\( 1 \\)（乘法单位元）\n- \\( \\pi \\)（圆周率）\n- \\( e \\)（自然对数的底）\n- \\( i \\)（虚数单位）\n\n---\n\n## **总结**\n欧拉公式的推导方法主要有：\n1. **泰勒级数展开法**（最常用）\n2. **微分方程法**\n3. **极限法（几何直观）**\n\n欧拉公式不仅优美，而且在 **信号处理、量子力学、电路分析** 等领域有广泛应用。"
}
