// Liste de noms
let noms = ["McGregor", "Cormier","Rua","Miocic","Ngannou","Makhachev","St-Pierre","Johnson","Silva","Henderson","Overeem","Gustafsson","Jones","Johnson","Nurmagomedov","Poirier", "Cro cop", "Gane"];


// Declaration variables utiles
// Masquer texte
let masquer = document.querySelector('#champMasquer');
 // Ajouter une nouvelle lettre ou un mot
let entrerLettre = document.querySelector('input');
// Confirmer la lettre
let confirmerLettre = document.querySelector('button');
// Text principal
let texte = document.querySelector("#presentation");
// Image
let image = document.querySelector(".img");
// Afficher resultat gagné ou perdu
let resultat = document.querySelector("#resultat");
// Message d'erreur
let message = document.querySelector('span');


message.style.display = "none";
resultat.style.display = "none";
entrerLettre.className = "entrerLettre";

let nombreAleatoire;
let dernier;
let masque = [];
let chances = 7;
let lettresRestantes;
let nomTrouver;
let rejouerJeu;
// Verifier si texte, espace ou tiret
let regex = /^[a-zA-Z- ]+$/;


// Fonctions

// Generer nombre Aleatoire
function genererNombreAleatoire(tab, dernierNombre) {
    do {
        nombreAleatoire = Math.floor(Math.random() * tab.length);
    } while (nombreAleatoire === dernierNombre);
   return nombreAleatoire;
}

// Verifier l'entrée tapée
function verifierSiLettre() {
    if (!regex.test(entrerLettre.value)) {
        entrerLettre.classList.remove("lettreValide")
        message.style.display = "block";
        message.className = "message";
        entrerLettre.classList.add("noLettre");
        confirmerLettre.disabled = true;
     }
     else {
        confirmerLettre.disabled = false;
        entrerLettre.classList.remove("noLettre");
        message.style.display = "none";
        entrerLettre.classList.add("lettreValide");
     }
 } 


// Changer image
function changerImage (score) {
    switch (score) {
        case 6: 
            image.src = "/images/pendu-6.jpg";
            break;

            case 5: 
            image.src = "/images/pendu-5.jpg";
            break;

            case 4: 
            image.src = "/images/pendu-4.jpg";
            break;

            case 3: 
            image.src = "/images/pendu-3.jpg";
            break;

            case 2: 
            image.src = "/images/pendu-2.jpg";
            break;

            case 1: 
            image.src = "/images/pendu-1.jpg";
            break;

            case 0: 
            image.src = "/images/pendu-perdu.jpg";
            
            break;
    
        default: image.src = "/images/victoire.jpg";
            break;
    }
}


// Parametres de debut du jeu
    function debutJeu() {
        entrerLettre.focus();
        chances = 7;
        texte.textContent = ("Vous devez trouver le nom d'un combattant de MMA, vous avez " + chances + " chances.");
        resultat.style.display = "none";
        resultat.textContent = "";
        image.src = "images/debut-pendu-7.png";
        entrerLettre.addEventListener('keyup', verifierSiLettre);

           // Generer un nombre aléatoire
          
            nombreAleatoire = genererNombreAleatoire(noms, dernier);
            dernier = nombreAleatoire;
 
     // // Afficher le nombre de tirets en fonction du nom de la ville
     nomTrouver = noms[nombreAleatoire];
     lettresRestantes = nomTrouver.length;
     for (let index = 0; index < nomTrouver.length; index++) {
         // Gerer les tirets et les espaces
         if (nomTrouver[index] === " ") {
            masque.push(" ");
            lettresRestantes--;
        }
        else if (nomTrouver[index] === "-") {
            masque.push(" - ");
        }
         else {
             masque.push("_");
         }
         
     }
     
     masquer.textContent = masque.join('');

     for (let index = 0; index < nomTrouver.length; index++) {
        if (masque[index].includes("-")) {
            lettresRestantes--;
        }
     }
    }
    
    // Deroulement du jeu
    function gererJeu() {

            // Verifier qu'il s'agit d'une lettre ou d'une chaine de caracteres
                if (!verifierSiLettre) {
                message.style.display = "block";
                message.className = "message";
            }
            
            else {
                message.style.display = "none";
                let contient = false;
                
    
                if (nomTrouver.toUpperCase().includes(entrerLettre.value.toUpperCase())) {
                    // // Rechercher le mot en entier
                    if (entrerLettre.value.toUpperCase() === nomTrouver.toUpperCase()) {
                        masque = nomTrouver.toUpperCase().split('');
                        contient = true;
                        masquer.textContent = nomTrouver.toUpperCase();
                        lettresRestantes = 0;
                        masquer.style.color = "gold";
                    } 
                    // Rechercher la lettre
                    else {
                        for (let index = 0; index < nomTrouver.length; index++) {
                            if (entrerLettre.value.toUpperCase() === nomTrouver[index].toUpperCase() && masque[index] == "_") {
                                masque[index] = entrerLettre.value.toUpperCase();
                                lettresRestantes--; 
                            }   
                            
                        }
                        contient = true;
                        entrerLettre.value = ""; 
                        
                    }
                    
                    masquer.textContent = masque.join('');
                    
                }
                
              
                // Si ne contient pas la lettre ou le mot
                if (!contient) {
                    chances--;
                    texte.textContent = ("Il vous reste " + chances + " chances");
                    entrerLettre.value = "";
                    changerImage(chances);
                }
                // Perdu
                if (chances === 0) {
                    changerImage(chances);
                    resultat.style.display = "block";
                    resultat.textContent = "Vous êtes KO! Vous avez perdu";
                    texte.textContent = ("Il vous reste " + chances + " chances. Le nom à trouver etait :");
                    resultat.classList.add("defaite");
                    confirmerLettre.style.display = "none";
                    entrerLettre.style.display = "none";
                    setTimeout(() => {
                        masquer.textContent = nomTrouver.toUpperCase();
                    }, 1000);
                    setTimeout(rejouer, 4000);       
                }

    
                // Gagné 
                if (lettresRestantes === 0) {
                    image.src = "images/victoire.jpg";
                    resultat.style.display = "block";
                    resultat.textContent = "Bravo vous avez gagné le combat!";
                    resultat.classList.add("victoire");
                    confirmerLettre.style.display = "none";
                    entrerLettre.style.display = "none";
                    setTimeout(rejouer, 3000);
                }
            }
                }

    // Recommencer jeu
    function rejouer() {
        entrerLettre.value = "";
        masque = [];
        masquer.style.color = "white";
        confirmerLettre.style.display = "block";
        entrerLettre.style.display = "block";
        resultat.className = "resultat";
        debutJeu();
    }

// Lancement du jeu
    debutJeu();

     // Gerer la lettre entrée au click
        confirmerLettre.addEventListener('click', gererJeu);
    
     // Gerer la touche entrée
        entrerLettre.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                gererJeu();
            }
        });

         
    
                
    
    

        

            
   





