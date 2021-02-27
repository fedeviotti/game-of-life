
# Game of life

Implementazione di Game of Life

## Schema iniziale

Il programma in avvio carica una griglia di 16 righe e 38 colonne con schema iniziale generato randomicamente.

Da applicativo è possibile caricare nuovi template tramite dei file di testo.
Nella root del progetto ho incluso alcuni file con schemi iniziali di esempio. I file sono riconosbili perchè il nome file segue questo pattern: init-gen-[nome].txt 

## Funzionalità

### Bottone Start/Stop
Permette di avviare/stoppare la simulazione.

### Bottone Next
Permette di avviare una singola simulazione per volta.

### Bottoni Speed Up/Slow Down
Permette di aumentare/diminuire la velocità di simulazione. L'intervallo può andare da 0 a 1 secondo.

### Bottone Randomize
Genera un nuovo schema randomico nella griglia (con le dimensioni attuali).

### Bottone Reset
Ricarica l'ultimo schema caricato, sia esso random, caricato da file o modificato manualmente dall'utente.

### Bottone Clear
Svuota compleramente lo schema nella griglia.

### Click su singola cella
Quando la simulazione è ferma, le celle della griglia sono cliccabili.
Con il click si modifica lo stato della cella.



## Run

### `npm run start`

Per avviare il programma in locale.

## Deploy

La versione deployata del programma si trova al seguente [link](http://gameoflife.fedeviotti.com.s3-website.eu-south-1.amazonaws.com/).
