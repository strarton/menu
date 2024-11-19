class Enlace {
    constructor(color, nombre, modo /* link o evento */) {
        this._color = color;
        this._nombre = nombre;
        this._modo = modo;
    }

    get color() {
        return this._color;
    }

    set color(valor) {
        if (typeof valor === 'string') {
            this._color = valor;
        } else {
            throw new Error("El valor de 'color' debe ser un string.");
        }
    }

    get nombre() {
        return this._nombre;
    }

    set nombre(valor) {
        if (typeof valor === 'string') {
            this._nombre = valor;
        } else {
            throw new Error("El valor de 'nombre' debe ser un string.");
        }
    }

    get modo() {
        return this._modo;
    }

    set modo(valor) {
        if (valor === 'link' || valor === 'evento') {
            this._modo = valor;
        } else {
            throw new Error("El valor de 'modo' debe ser 'link' o 'evento'.");
        }
    }

    get todoEnlace() {
        return {
            color: this.color,
            nombre: this.nombre,
            modo: this.modo,
        };
    }
}

class Categoria {
    constructor(color, nombre) {
        this._color = color;
        this._nombre = nombre;
        this._enlaces = []; // Contiene los enlaces
    }

    get color() {
        return this._color;
    }

    set color(valor) {
        if (typeof valor === 'string') {
            this._color = valor;
        } else {
            throw new Error("El valor de 'color' debe ser un string.");
        }
    }

    get nombre() {
        return this._nombre;
    }

    set nombre(valor) {
        if (typeof valor === 'string') {
            this._nombre = valor;
        } else {
            throw new Error("El valor de 'nombre' debe ser un string.");
        }
    }

    agregarEnlace(enlace) {
        if (enlace instanceof Enlace) {
            this._enlaces.push(enlace);
        } else {
            throw new Error("Debe agregar una instancia válida de Enlace.");
        }
    }

    get enlaces() {
        return this._enlaces.map((enlace) => enlace.todoEnlace);
    }

    get todoCategoria() {
        return {
            color: this.color,
            nombre: this.nombre,
            enlaces: this.enlaces,
        };
    }
}

class Menu {
    constructor(color, fuente, tamaño, posicion /* horizontal o vertical */) {
        this._color = color;
        this._fuente = fuente;
        this._tamaño = tamaño;
        this._posicion = posicion;
        this._categorias = []; // Contiene las categorías
    }

    get color() {
        return this._color;
    }

    set color(valor) {
        if (typeof valor === 'string') {
            this._color = valor;
        } else {
            throw new Error("El valor de 'color' debe ser un string.");
        }
    }

    get fuente() {
        return this._fuente;
    }

    set fuente(valor) {
        if (typeof valor === 'string') {
            this._fuente = valor;
        } else {
            throw new Error("El valor de 'fuente' debe ser un string.");
        }
    }

    get tamaño() {
        return this._tamaño;
    }

    set tamaño(valor) {
        if (typeof valor === 'string') {
            this._tamaño = valor;
        } else {
            throw new Error("El valor de 'tamaño' debe ser un string.");
        }
    }

    get posicion() {
        return this._posicion;
    }

    set posicion(valor) {
        if (valor === 'horizontal' || valor === 'vertical') {
            this._posicion = valor;
        } else {
            throw new Error("El valor de 'posicion' debe ser 'horizontal' o 'vertical'.");
        }
    }

    agregarCategoria(categoria) {
        if (categoria instanceof Categoria) {
            this._categorias.push(categoria);
        } else {
            throw new Error("Debe agregar una instancia válida de Categoria.");
        }
    }

    get categorias() {
        return this._categorias.map((categoria) => categoria.todoCategoria);
    }

    renderizarMenu() {
        const $nav = $('#nav');
        if ($nav.length === 0) {
            throw new Error("No se encontró el elemento con el identificador #nav.");
        }

        // Limpia el contenido previo
        $nav.empty();
        $nav.css({
            fontFamily: this.fuente,
            fontSize: this.tamaño,
            backgroundColor: this.color,
            display: this.posicion === 'horizontal' ? 'flex' : 'block',
            flexDirection: this.posicion === 'horizontal' ? 'row' : 'column',
        });

        this._categorias.forEach((categoria) => {
            const $categoriaDiv = $('<div></div>')
                .css({
                    backgroundColor: categoria.color,
                    margin: '10px',
                    padding: '5px',
                });

            const $tituloCategoria = $('<h3></h3>').text(categoria.nombre);
            $categoriaDiv.append($tituloCategoria);

            const $enlacesList = $('<ul></ul>');
            categoria.enlaces.forEach((enlace) => {
                const $enlaceItem = $('<li></li>');
                const $enlaceElemento = $('<a></a>')
                    .text(enlace.nombre)
                    .css('color', enlace.color);

                if (enlace.modo === 'link') {
                    $enlaceElemento.attr('href', '#');
                } else if (enlace.modo === 'evento') {
                    $enlaceElemento.attr('href', '#').on('click', () => {
                        alert(`Evento disparado para: ${enlace.nombre}`);
                    });
                }

                $enlaceItem.append($enlaceElemento);
                $enlacesList.append($enlaceItem);
            });

            $categoriaDiv.append($enlacesList);
            $nav.append($categoriaDiv);
        });
    }

    get todoMenu() {
        return {
            color: this.color,
            fuente: this.fuente,
            tamaño: this.tamaño,
            posicion: this.posicion,
            categorias: this.categorias,
        };
    }
}

const menuPrincipal = new Menu('lightblue', 'Arial', '16px', 'vertical');
const categoria1 = new Categoria('lightcoral', 'Categoría 1');
const categoria2 = new Categoria('lightgreen', 'Categoría 2');
const categoria3 = new Categoria('lightgreen', 'Categoría izan');

const enlace1 = new Enlace('blue', 'Google', 'link');
const enlace2 = new Enlace('red', 'Evento de prueba', 'evento');
const enlace3 = new Enlace('grey', 'Google', 'link');

categoria1.agregarEnlace(enlace1);
categoria1.agregarEnlace(enlace2);
categoria3.agregarEnlace(enlace3)
menuPrincipal.agregarCategoria(categoria1);
menuPrincipal.agregarCategoria(categoria2);
menuPrincipal.agregarCategoria(categoria3);

menuPrincipal.renderizarMenu();
