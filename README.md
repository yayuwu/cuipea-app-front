# Cuipea App
Somos un equipo de mujeres comprometidas con el desarrollo de proyectos innovadores que buscan un impacto real en la sociedad, creando cuipea : la app web que busca optimizar y cubrir integralmente las necesidades actuales en el sistema de salud y cuidados pediátricos a través de una Libreta Sanitaria Digital.

## Clonar repositorio

```
git clone https://github.com/yayuwu/cuipea-app.git
```

## Front y Back

Para trabajar en la parte del front escribir en la terminal:
```
cd front
```
 o para trabajar en el back:
```
cd back
```

### Instalar dependencias

```
npm install
```

## Comandos principales
Estaremos trabajando cada una en una rama diferente, la rama main no se toca, y la rama develop sirve para unificar el desarrollo de todas (ya sea durante o al final, nos vamos organizando).

### Crear rama
```
git branch feature/nombre_de_la_rama
```
### Cambiarse de rama
```
git switch feature/nombre_de_la_rama
```
Siempre asegurarse en qué rama vas a estar trabajando. El nombre de la rama lo pueden inventar ustedes, como "feature/header" o "feature/login".
### Agregar cambios y actualizar la repo con la nueva rama
Estos 3 comandos lo van a usar siempre, así que es lo primero que van a aprender rápido por el hábito.
```
git add .
git commit -m "Subiendo cambios"
git push origin feature/nombre_de_la_rama
```

### Traer actualizaciones de la repo
Siempre vamos a estar modificando código, así que vamos a tener que traer esos cambios. Igualmente siempre nos vamos a comunicar cada vez que subimos cambios a la repo.
```
git pull
``` 

## Comandos para usar en el front
### Arrancar SCSS
```
npm run sass
```
Para deternerlo solo usamos el `Ctrl + C`

## Mensaje final

No tengan miedo en romper algo, siempre se aprende de esa manera (así aprendí yo u.u), cualquier cosa siempre estoy para enseñarles y ayudarlas <3

