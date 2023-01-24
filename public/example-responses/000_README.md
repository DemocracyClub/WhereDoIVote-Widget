A selection of responses from the dev.DC API
replicating various standard and edge cases cases we need to handle:

# General

## No upcoming election:

- AA11AA
  - **uses postcode-AA11AA.json**

## Upcoming election with station and postcode coords, no notifications

- AA12AA
  - **uses postcode-AA12AA.json**

## Northern Irish council ID

- AA15AA
  - **uses postcode-AA15AA.json**

## Upcoming election with no coords at all, no notifications

- AA21AA
  - **uses postcode-AA21AA.json**

## Upcoming election with station coords but no postcode coords, no notifications

- AA22AA
  - **uses postcode-AA22AA.json**

## Voter ID pilots:

- DE13GB
  - **uses postcode-DE13GB.json**

## Uncontested elections:

- SS30AA
  - equal numbers of candidates and seats
  - **uses postcode-SS30AA.json**
- SS30AB
  - fewer candidates than seats
  - **uses postcode-SS30AB.json**
- SS30AC
  - zero candidates
  - **uses postcode-SS30AC.json**

## Address pickers:

- address pickers with different polling stations _and ward_:
  - TN48XA
    - RUSTHALL CRICKET CLUB COACH ROAD, ROYAL TUNBRIDGE WELLS - Tunbridge Wells local election: Rusthall
    - YORK HOUSE 2 1A LANGTON ROAD, ROYAL TUNBRIDGE WELLS - No election in this ward
    - **uses postcode-TN48XA.json**
    - **uses address-10024136194.json**
    - **uses address-10000066465.json**
  - CT54LX
    - 1 BORSTAL HILL, WHITSTABLE - Canterbury local election: Gorrell
    - 2 BORSTAL HILL, WHITSTABLE - Canterbury local election: Seasalter
    - **uses postcode-CT54LX.json**
    - **uses address-100060841558.json**
    - **uses address-100060841557.json**

## Local and mayoral elections on the same day:

- LE42TY
  - **uses postcode-LE42TY.json**

## Countermanded poll:

- CO168EZ
  - **uses postcode-CO168EZ.json**
  - edited to have parl.2019-12-12 as primary ballot ID for testing cancelled election

# Candidates

## Lots of candidates for General Election

- UB78FA

  - **uses postcode-UB78FA.json**

## Lots of candidates for General Election but candidates not verified

- UB7XNV
  - **uses postcode-UB7XNV.json**
