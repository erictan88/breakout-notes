namespace SpriteKind {
    export const powerUps = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.powerUps, function (sprite, otherSprite) {
    Bullets = 5
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (Bullets > 0) {
        projectile = sprites.createProjectileFromSprite(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . 9 9 . . . . . . . 
            . . . . . . 9 9 9 9 . . . . . . 
            . . . . . . 9 9 9 9 . . . . . . 
            . . . . . . . 9 9 . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, Paddle, 0, 50)
    }
})
info.onCountdownEnd(function () {
    Ball.setVelocity(randint(-70, 70), randint(-40, -70))
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Projectile, function (sprite, otherSprite) {
    otherSprite.setVelocity(otherSprite.vx, otherSprite.vy * -1)
})
scene.onHitWall(SpriteKind.Projectile, function (sprite, location) {
    if (tiles.tileAtLocationEquals(location, sprites.dungeon.floorLight2)) {
        tiles.setWallAt(location, false)
        tiles.setTileAt(location, assets.tile`transparency16`)
        info.changeScoreBy(1)
        if (info.score() == 10) {
            PowerIcon = sprites.create(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . 2 2 2 2 2 2 2 . . . . 
                . . . . 2 1 1 1 1 1 1 1 2 . . . 
                . . . 2 1 1 1 1 1 1 1 1 1 2 . . 
                . . 2 1 1 1 7 7 7 7 1 1 1 1 2 . 
                . . 2 1 1 1 7 1 1 1 7 1 1 1 2 . 
                . . 2 1 1 1 7 1 1 1 7 1 1 1 2 . 
                . . 2 1 1 1 7 7 7 7 1 1 1 1 2 . 
                . . 2 1 1 1 7 1 1 1 1 1 1 1 2 . 
                . . 2 1 1 1 7 1 1 1 1 1 1 1 2 . 
                . . 2 1 1 1 7 1 1 1 1 1 1 1 2 . 
                . . . 2 1 1 1 1 1 1 1 1 1 2 . . 
                . . . . 2 1 1 1 1 1 1 1 2 . . . 
                . . . . . 2 2 2 2 2 2 2 . . . . 
                . . . . . . . . . . . . . . . . 
                `, SpriteKind.powerUps)
            tiles.placeOnTile(PowerIcon, location)
            PowerIcon.vy = 10
        }
        if (info.score() == 20) {
            tiles.setTilemap(tilemap`level3`)
            StartBall()
        }
    }
    if (tiles.tileAtLocationEquals(location, sprites.dungeon.hazardLava0)) {
        info.changeLifeBy(-1)
        pause(1000)
        StartBall()
    }
})
scene.onOverlapTile(SpriteKind.powerUps, sprites.dungeon.hazardLava0, function (sprite, location) {
    sprite.destroy(effects.disintegrate, 200)
})
function StartBall () {
    Ball.setVelocity(0, 0)
    tiles.placeOnTile(Ball, tiles.getTileLocation(4, 8))
    info.startCountdown(2)
}
let PowerIcon: Sprite = null
let projectile: Sprite = null
let Bullets = 0
let Ball: Sprite = null
let Paddle: Sprite = null
tiles.setTilemap(tilemap`level1`)
Paddle = sprites.create(img`
    ................................
    ................................
    ................................
    ................................
    ................................
    ................................
    ................................
    ................................
    ................................
    ................................
    88............................88
    88888888888888888888888888888888
    .888888888888888888888888888888.
    .888888888888888888888888888888.
    ................................
    ................................
    `, SpriteKind.Player)
tiles.placeOnTile(Paddle, tiles.getTileLocation(4, 10))
controller.moveSprite(Paddle, 100, 0)
Ball = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . 2 2 2 . . . . . . 
    . . . . . 2 2 2 2 2 2 2 . . . . 
    . . . . 2 2 2 2 2 2 2 2 2 . . . 
    . . . . 2 1 4 4 2 2 2 2 2 . . . 
    . . . 2 2 4 4 5 2 2 2 2 2 2 . . 
    . . . 2 2 4 5 2 2 2 2 2 2 2 . . 
    . . . 2 2 2 2 2 2 2 2 2 2 2 . . 
    . . . . 2 2 2 2 2 2 2 2 2 . . . 
    . . . . 2 2 2 2 2 2 2 2 2 . . . 
    . . . . . 2 2 2 2 2 2 2 . . . . 
    . . . . . . . 2 2 2 . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Projectile)
scene.cameraFollowSprite(Ball)
Ball.setBounceOnWall(true)
info.setLife(3)
StartBall()
