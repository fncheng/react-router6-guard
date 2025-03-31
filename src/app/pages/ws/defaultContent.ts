export const defaultContent = `

欧拉公式 \( e^{i\theta} = \cos\theta + i\sin\theta \) 的推导可以通过**泰勒级数展开**来实现。以下是详细步骤：

---

### 1. **泰勒级数的基础知识**
泰勒级数将函数展开为无限项的多项式形式。三个关键函数的泰勒展开式为：
- **指数函数** \( e^x \)：
  \[
  e^x = 1 + x + \frac{x^2}{2!} + \frac{x^3}{3!} + \frac{x^4}{4!} + \cdots
  \]
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
