# Rutas api de consultas 



## GET /api/queries

Consulta inicial que se ejecutaría en el dashboard para obtener las cabeceras de los queries realizados.

### Output

```jsonc
[
     {
        "_id": "60d357e4845de354c6563704",
        "name": "Analisis del platino",
        "datetime": "2021-06-23T15:48:52.134000",
         "instruments": [
            {
                "_id": "60f6d9587e8692565c752042",
                "name": "Oro"
            },
            {
                "_id": "60f6d9587e8692565c752043",
                "name": "plata"
            }
        ]
    },

    // ...
]
```

## GET /api/queries/[id]

Consulta que se realiza al ingresar a un query especifico, donde se muestran los instrumentos que posee y los respectivos instrumentos.

### Output

```jsonc
{
        "id": "60d357e4845de354c6563704",
        "name": "Analisis del platino",
        "datetime": "2021-06-23T15:48:52.134000",
         "instruments": [
            {
                "id": "60f6d9587e8692565c752042",
                "name": "Oro"
            },
            {
                "id": "60f6d9587e8692565c752043",
                "name": "plata"
            }
        ]
    
}
```

## GET /api/instruments/[id]

Consulta realizada para obtener un instrumento en específico sin obtener los puntos y estrategias a aplicar

### Output

```jsonc
[
   {
        "_id": "610d71a682bb6d9022ce191c",
        "name": "Ethereum",
        "params": [
            {
                "stop": " -0.67",
                "buy": "-1.00",
                "sell": "-4.00"
            },
            {
                "stop": " -0.33",
                "buy": "-1.00",
                "sell": "-4.00"
            },
            {
                "stop": " 0.00",
                "buy": "-1.00",
                "sell": "-4.00"
            },
            {
                "stop": " 0.33",
                "buy": "-1.00",
                "sell": "-4.00"
            },
            {
                "stop": " 0.67",
                "buy": "-1.00",
                "sell": "-4.00"
            },
            {
                "stop": " 1.00",
                "buy": "-1.00",
                "sell": "-4.00"
            },
            {
                "stop": " 1.33",
                "buy": "-1.00",
                "sell": "-4.00"
            },
            {
                "stop": " 1.67",
                "buy": "-1.00",
                "sell": "-4.00"
            },
            {
                "stop": " 2.00",
                "buy": "-1.00",
                "sell": "-4.00"
            },
            {
                "stop": " 2.33",
                "buy": "-1.00",
                "sell": "-4.00"
            }
        ]
    }
]
```


## GET /api/points/[id_instrumento]?(starDate: fecha inicial del fragmento<opcional> , endDate: fecha final del fragmento<opcional>, calc<obtener en conjunto con los calculos de las estrategias>)

Consulta realizada al momento de construir la gráfica de velas, con sus respectivas estrategias a aplicar por cada parámetro ingresado anteriormente por el usuario en el *POST*

### Output
```jsonc
{
    "total": 4,
    "calcTotal": {
        "buy": 25310,
        "sell": 0,
        "stop": 55150
    },
    "data": [
        {
            "_id": "610d71bd82bb6d9022ce3669",
            "datetime": "2020-01-30T13:01:00.000Z",
            "high": 14.2121,
            "low": 14.21,
            "close": 14.21
        },
        {
            "_id": "610d71bd82bb6d9022ce366a",
            "datetime": "2020-01-30T13:02:00.000Z",
            "high": 14.25,
            "low": 14.2154,
            "close": 14.219
        },
        
        {
            "_id": "610d71bd82bb6d9022ce388a",
            "datetime": "2020-01-31T16:00:00.000Z",
            "high": 14.38,
            "low": 14.37,
            "close": 14.37
        }
    ]
}
