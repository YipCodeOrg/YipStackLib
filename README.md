# YipStackLib

Application-specific code shared across the YipCode stack

## Configuring this as a Submodule

 - Add the submodule: `git submodule add git@github.com:ColmBhandal/YipStackLib.git src/packages/YipStackLib`
 - (Optional) Configure `git status` to print out submodule changes in its summary: `git config status.submodulesummary 1`
 - Configure Git to prevent publishing changes to the main module if there are unpublished submodule changes: `git config push.recurseSubmodules check`
 
 To verify the Git configuration worked, do: `git config --list | grep submodule` and inspect the ouptut. Among some other submodule stuff, you should see entries for all the configuraiton settings you applied earlier:
 - `status.submodulesummary=1`
 - `push.recursesubmodules=check`
 
 
