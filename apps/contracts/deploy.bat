@echo off
setlocal

REM Check if PRIVATE_KEY and RPC_URL environment variables are set
if "%PRIVATE_KEY%"=="" (
  echo Error: PRIVATE_KEY environment variable is not set.
  exit /b 1
)

if "%RPC_URL%"=="" (
  echo Error: RPC_URL environment variable is not set.
  exit /b 1
)

REM Run the script with the private key and RPC URL from the environment
forge script script/FullBleuNFT.s.sol --rpc-url %RPC_URL% --private-key %PRIVATE_KEY% --broadcast
