# Instruções para Debug do Marquee

## Como Verificar os Logs no DevTools

1. **Abra o site em produção** (https://andorinha.roilabs.com.br/)

2. **Abra o DevTools**:
   - Pressione `F12` ou
   - Clique com botão direito > Inspecionar > Console

3. **Vá para a aba Console**

4. **Role até a seção "Empresas que confiam na Andorinha"**

5. **Procure pelos logs que começam com `=== MARQUEE DEBUG ===`**

## O que os logs mostram:

### 1. Container Element
```
Container element: <div class="group flex...">
```
- Mostra o elemento container do marquee

### 2. Container Computed Styles
```
Container computed styles: {
  display: "flex",
  overflow: "hidden",
  '--duration': "40s",
  '--gap': "1rem"
}
```
- **IMPORTANTE**: Verifique se `--duration` está definido como "40s"
- Verifique se `overflow` é "hidden"

### 3. Item Computed Styles
```
Item computed styles: {
  display: "flex",
  animation: "marquee 40s linear infinite",
  animationName: "marquee",
  animationDuration: "40s",
  animationPlayState: "running",
  transform: "matrix(...)"
}
```
- **CRÍTICO**: Verifique se `animationName` é "marquee" (não "none")
- **CRÍTICO**: Verifique se `animationPlayState` é "running" (não "paused")
- **CRÍTICO**: Verifique se `animationDuration` é "40s"
- Se `animation` estiver como "none" ou vazio, a animação @keyframes não foi encontrada

### 4. Animations on Page
```
All animations on page: 15
Animations on marquee item: [Animation]
```
- Mostra quantas animações estão rodando na página
- Se "Animations on marquee item" estiver vazio `[]`, significa que nenhuma animação está aplicada ao elemento

### 5. Props
```
Props: {
  vertical: false,
  reverse: false,
  pauseOnHover: true,
  repeat: 4
}
```
- Confirma as propriedades passadas para o componente

## Problemas Comuns e Diagnóstico:

### ❌ Se `animationName` for "none":
**Problema**: A animação @keyframes "marquee" não está sendo encontrada no CSS
**Possíveis causas**:
- CSS não foi carregado corretamente
- @keyframes foi removido no processo de build
- Nome da animação está errado

### ❌ Se `animationPlayState` for "paused":
**Problema**: A animação está pausada
**Possíveis causas**:
- Hover está ativo e `pauseOnHover` está true
- CSS está sobrescrevendo o estado

### ❌ Se `--duration` for vazio ou diferente de "40s":
**Problema**: A variável CSS não está sendo aplicada
**Possível causa**:
- Inline styles não estão funcionando

### ❌ Se `Animations on marquee item` estiver vazio:
**Problema**: Nenhuma animação está rodando no elemento
**Possível causa**:
- @keyframes não existe
- animationName está como "none"
- Elemento não está sendo renderizado corretamente

## Compartilhe os Resultados

Copie e cole TODOS os logs do console que começam com `=== MARQUEE DEBUG ===`
e terminam com `=== END DEBUG ===` para que possamos diagnosticar o problema.
