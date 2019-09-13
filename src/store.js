import { get, writable } from 'svelte/store';

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

/**
 * Shuffles array in place.
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
        var j, x, i;
        for (i = a.length - 1; i > 0; i--) {
                j = Math.floor(Math.random() * (i + 1));
                x = a[i];
                a[i] = a[j];
                a[j] = x;
        }
        return a;
}

function createStore() {
	const { subscribe, set, update } = writable([]);

    // Can I get rid of this?
    var visible = [];

	return {
        subscribe,
        init: (rows, columns) => {
            const numColors = rows * columns / 2;
	
            let tiles = []
            for (let i = 0; i < numColors; i++) {
                const randomColor = getRandomColor();
                tiles.push(randomColor);
                tiles.push(randomColor);
            }
            
            shuffle(tiles);

            let cards = tiles.map((color, i) => { return {
                id: i,
                color: color,
                isActive: false,
                isInvisible: false,
            }});
            set(cards);
        },
		onSelected: (id) => {
            
            console.log("SELECTED")
            console.log(id)
            
            if (visible.length < 2) {
                visible.push(id);
                store.show(id);
            }
            
            if (visible.length === 2) {
                const shouldRemove = store.get(visible[0]).color === store.get(visible[1]).color
                if (shouldRemove) {
                    console.log("increase score")
                    score.update(n => n + 1);
                }
                setTimeout(function() {
                    visible.forEach(function(id) {
                        if (shouldRemove) {
                            store.remove(id);
                        } else {
                            store.hide(id)
                        }
                    })
                    visible.length = 0;
                }, 1000);
            }
                
        },
        get: (id) => {
            // This works by creating a subscription, reading the value, then unsubscribing. 
            // It's therefore not recommended in hot code paths.
            return get(store)[id];
        },
        show: (id) => {
            // id is index really...
            update((s) => {
                s[id].isActive = true;
                return s;
            })
        },
        remove: (id) => {
            // id is index really...
            update((s) => {
                s[id].isInvisible = true;
                return s;
            })
        },
        hide: (id) => {
            // id is index really...
            update((s) => {
                s[id].isActive = false;
                return s;
            })
        }
	};
}

export const store = createStore();

export const score = writable(0);
