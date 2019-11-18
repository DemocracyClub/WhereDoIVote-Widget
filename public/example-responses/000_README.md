A selection of responses from the dev.DC API
replicating various standard and edge cases cases we need to handle:

## No upcoming election:

- AA11AA
  - __uses postcode-AA11AA.json__

## Upcoming election with station and postcode coords, no notifications
- AA12AA
  - __uses postcode-AA12AA.json__

## Northern Irish council ID
- AA15AA
  - __uses postcode-AA15AA.json__

## Upcoming election with no coords at all, no notifications
- AA21AA
  - __uses postcode-AA21AA.json__

## Upcoming election with station coords but no postcode coords, no notifications
- AA22AA
  - __uses postcode-AA22AA.json__

## Voter ID pilots:
- DE13GB
  - __uses postcode-DE13GB.json__

## Uncontested elections:

- SS30AA
  - __uses postcode-SS30AA.json__

## Address pickers:

- address pickers with different polling stations _and ward_:
  - TN48XA
    - RUSTHALL CRICKET CLUB COACH ROAD, ROYAL TUNBRIDGE WELLS - Tunbridge Wells local election: Rusthall
    - YORK HOUSE 2 1A LANGTON ROAD, ROYAL TUNBRIDGE WELLS - No election in this ward
    - __uses postcode-TN48XA.json__
    - __uses address-10024136194.json__
    - __uses address-10000066465.json__
  - CT54LX 
    - 1 BORSTAL HILL, WHITSTABLE - Canterbury local election: Gorrell
    - 2 BORSTAL HILL, WHITSTABLE - Canterbury local election: Seasalter
    - __uses postcode-CT54LX.json__
    - __uses address-100060841558.json__
    - __uses address-100060841557.json__

## Local and mayoral elections on the same day:

- LE42TY
  - __uses postcode-LE42TY.json__

## Countermanded poll:

- CO168EZ
  - __uses postcode-CO168EZ.json__
